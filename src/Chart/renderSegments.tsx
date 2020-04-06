import React from 'react';
import Path from '../Path';
import { extractPercentage, extractAbsoluteCoordinates } from '../utils';
import { ExtendedData, StyleObject } from '../commonTypes';
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
  forcedReveal?: number
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

  const { cx, cy, radius } = extractAbsoluteCoordinates(props);
  const lineWidth = extractPercentage(radius, props.lineWidth);
  const paths = data.map((dataEntry, index) => {
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
        reveal={forcedReveal ?? props.reveal}
        title={dataEntry.title}
        style={Object.assign({}, style, dataEntry.style)}
        stroke={dataEntry.color}
        strokeLinecap={props.rounded ? 'round' : undefined}
        tabIndex={props.segmentsTabIndex}
        fill="none"
        onBlur={
          props.onBlur &&
          ((e: React.FocusEvent) => {
            // @ts-ignore
            props.onBlur(e, props.data, index);
          })
        }
        onClick={
          props.onClick &&
          ((e: React.MouseEvent) => {
            // @ts-ignore
            props.onClick(e, props.data, index);
          })
        }
        onFocus={
          props.onFocus &&
          ((e: React.FocusEvent) => {
            // @ts-ignore
            props.onFocus(e, props.data, index);
          })
        }
        onKeyDown={
          props.onKeyDown &&
          ((e: React.KeyboardEvent) => {
            // @ts-ignore
            props.onKeyDown(e, props.data, index);
          })
        }
        onMouseOver={
          props.onMouseOver &&
          ((e: React.MouseEvent) => {
            // @ts-ignore
            props.onMouseOver(e, props.data, index);
          })
        }
        onMouseOut={
          props.onMouseOut &&
          ((e: React.MouseEvent) => {
            // @ts-ignore
            props.onMouseOut(e, props.data, index);
          })
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
