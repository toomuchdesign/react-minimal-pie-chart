import React from 'react';
import Path from '../Path';
import {
  extractPercentage,
  extractAbsoluteCoordinates,
  isNumber,
} from '../utils';
import type { ExtendedData, StyleObject } from '../commonTypes';
import type { Props as ChartProps } from './Chart';

function makeSegmentTransitionStyle(
  duration: number,
  easing: string,
  furtherStyles?: StyleObject
): { transition: string } {
  // Merge chart's animation CSS transition with "transition" found to furtherStyles
  let transition = `stroke-dashoffset ${duration}ms ${easing}`;
  if (furtherStyles && furtherStyles.transition) {
    transition = `${transition},${furtherStyles.transition}`;
  }
  return {
    transition,
  };
}

function getRevealValue<Reveal>(props: { reveal?: Reveal; animate: boolean }) {
  //@NOTE When animation is on, chart has to be fully revealed when reveal is not set
  if (props.animate && !isNumber(props.reveal)) {
    return 100;
  }
  return props.reveal;
}

export default function renderSegments(
  data: ExtendedData,
  props: ChartProps,
  revealOverride?: null | number
) {
  // @NOTE this should go in Path component. Here for performance reasons
  const reveal = revealOverride ?? getRevealValue(props);
  const segmentTransitionsCombined =
    props.animate &&
    makeSegmentTransitionStyle(
      props.animationDuration,
      props.animationEasing,
      props.segmentsStyle
    );

  const { cx, cy, radius } = extractAbsoluteCoordinates(props);
  const lineWidth = extractPercentage(radius, props.lineWidth);
  const paths = data.map((dataEntry, index) => {
    return (
      <Path
        key={dataEntry.key || index}
        cx={cx}
        cy={cy}
        startAngle={props.startAngle + dataEntry.startOffset}
        lengthAngle={dataEntry.degrees}
        radius={radius}
        lineWidth={lineWidth}
        reveal={reveal}
        title={dataEntry.title}
        style={Object.assign(
          {},
          props.segmentsStyle,
          segmentTransitionsCombined,
          dataEntry.style
        )}
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
