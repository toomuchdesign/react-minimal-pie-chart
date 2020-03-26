import React from 'react';
import Path from '../Path';
import { extractPercentage, extractAbsoluteCoordinates } from '../utils';
import { ExtendedData, ExtendedDataEntry, StyleObject } from '../commonTypes';
import { Props as ChartProps } from './index';

function makeSegmentTransitionStyle(
  duration: number,
  easing: string,
  furtherStyles: StyleObject = {}
) {
  // Merge CSS transition necessary for chart animation with the ones provided by "segmentsStyle"
  const transition = [
    `stroke-dashoffset ${duration}ms ${easing}`,
    furtherStyles.transition,
  ]
    .filter(Boolean)
    .join(',');

  return {
    transition,
  };
}

export default function renderSegments(
  data: ExtendedData,
  props: ChartProps,
  hide: Boolean
) {
  let style = props.segmentsStyle;
  if (props.animate) {
    const transitionStyle = makeSegmentTransitionStyle(
      props.animationDuration,
      props.animationEasing,
      style
    );
    style = Object.assign({}, style, transitionStyle);
  }

  // Hide/reveal the segment?
  let reveal: number;
  if (hide === true) {
    reveal = 0;
  } else if (typeof props.reveal === 'number') {
    reveal = props.reveal;
  } else if (hide === false) {
    reveal = 100;
  }

  const { cx, cy, radius } = extractAbsoluteCoordinates(props);
  const lineWidth = extractPercentage(radius, props.lineWidth);

  let filteredData: ExtendedData = data;
  if (typeof props.filterSegments === 'function') {
    filteredData = data.reduce(
      (acc: ExtendedData, dataEntry: ExtendedDataEntry, index: number) => {
        if (props.filterSegments({ ...dataEntry }, index) === true) {
          return acc;
        }

        return [...acc, dataEntry];
      },
      []
    );
  }

  const paths = filteredData.map((dataEntry, index) => {
    const startAngle = props.startAngle + dataEntry.startOffset;

    return (
      <Path
        key={dataEntry.key || index}
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        lengthAngle={dataEntry.degrees}
        radius={radius}
        lineWidth={lineWidth}
        reveal={reveal}
        title={dataEntry.title}
        style={Object.assign({}, style, dataEntry.style)}
        stroke={dataEntry.color}
        strokeLinecap={props.rounded ? 'round' : undefined}
        fill="none"
        onMouseOver={
          props.onMouseOver &&
          // @ts-ignore
          ((e: React.MouseEvent) => props.onMouseOver(e, props.data, index))
        }
        onMouseOut={
          props.onMouseOut &&
          // @ts-ignore
          ((e: React.MouseEvent) => props.onMouseOut(e, props.data, index))
        }
        onClick={
          props.onClick &&
          // @ts-ignore
          ((e: React.MouseEvent) => props.onClick(e, props.data, index))
        }
      />
    );
  });

  if (props.background) {
    paths.unshift(
      <Path
        key="bg"
        cx={cx}
        cy={cy}
        startAngle={props.startAngle}
        lengthAngle={props.lengthAngle}
        radius={radius}
        lineWidth={lineWidth}
        stroke={props.background}
        strokeLinecap={props.rounded ? 'round' : undefined}
        fill="none"
      />
    );
  }

  return paths;
}
