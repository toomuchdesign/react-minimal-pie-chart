import React from 'react';
import Path from '../Path';
import { extractPercentage, functionProp, isNumber } from '../utils';
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

function makeEventHandler<Event, EventHandler, Payload1, Payload2>(
  eventHandler: undefined | (EventHandler & Function),
  payload1: Payload1,
  payload2: Payload2
) {
  return (
    eventHandler &&
    ((e: Event) => {
      eventHandler(e, payload1, payload2);
    })
  );
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

  const { radius } = props;
  const lineWidth = extractPercentage(radius, props.lineWidth);
  const paths = data.map((dataEntry, index) => {
    return (
      <Path
        key={dataEntry.key || index}
        cx={props.cx}
        cy={props.cy}
        startAngle={props.startAngle + dataEntry.startOffset}
        lengthAngle={dataEntry.degrees}
        radius={radius}
        lineWidth={lineWidth}
        reveal={reveal}
        shift={functionProp(props.segmentsShift, props.data, index)}
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
        onBlur={makeEventHandler(props.onBlur, props.data, index)}
        onClick={makeEventHandler(props.onClick, props.data, index)}
        onFocus={makeEventHandler(props.onFocus, props.data, index)}
        onKeyDown={makeEventHandler(props.onKeyDown, props.data, index)}
        onMouseOver={makeEventHandler(props.onMouseOver, props.data, index)}
        onMouseOut={makeEventHandler(props.onMouseOut, props.data, index)}
      />
    );
  });

  if (props.background) {
    paths.unshift(
      <Path
        key="bg"
        cx={props.cx}
        cy={props.cy}
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
