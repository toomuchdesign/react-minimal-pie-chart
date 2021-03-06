import React from 'react';
import type { CSSProperties } from 'react';
import ReactMinimalPieChartPath from '../Path';
import { extractPercentage, functionProp, isNumber } from '../utils';
import type { ExtendedData } from '../commonTypes';
import type { PropsWithDefaults as ChartProps } from './Chart';

function combineSegmentTransitionsStyle(
  duration: number,
  easing: string,
  customStyle?: CSSProperties
): { transition: string } {
  // Merge chart's animation CSS transition with "transition" found to customStyle
  let transition = `stroke-dashoffset ${duration}ms ${easing}`;
  if (customStyle && customStyle.transition) {
    transition = `${transition},${customStyle.transition}`;
  }
  return {
    transition,
  };
}

function getRevealValue<Reveal>(props: { reveal?: Reveal; animate?: boolean }) {
  //@NOTE When animation is on, chart has to be fully revealed when reveal is not set
  if (props.animate && !isNumber(props.reveal)) {
    return 100;
  }
  return props.reveal;
}

function makeEventHandler<Event, EventHandler, Payload>(
  eventHandler: undefined | (EventHandler & Function),
  payload: Payload
) {
  return (
    eventHandler &&
    ((e: Event) => {
      eventHandler(e, payload);
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
  const {
    radius,
    center: [cx, cy],
  } = props;
  const lineWidth = extractPercentage(radius, props.lineWidth);
  const paths = data.map((dataEntry, index) => {
    const segmentsStyle = functionProp(props.segmentsStyle, index);
    return (
      <ReactMinimalPieChartPath
        cx={cx}
        cy={cy}
        key={dataEntry.key || index}
        lengthAngle={dataEntry.degrees}
        lineWidth={lineWidth}
        radius={radius}
        rounded={props.rounded}
        reveal={reveal}
        shift={functionProp(props.segmentsShift, index)}
        startAngle={dataEntry.startAngle}
        title={dataEntry.title}
        style={Object.assign(
          {},
          segmentsStyle,
          props.animate &&
            combineSegmentTransitionsStyle(
              props.animationDuration,
              props.animationEasing,
              segmentsStyle
            )
        )}
        stroke={dataEntry.color}
        tabIndex={props.segmentsTabIndex}
        onBlur={makeEventHandler(props.onBlur, index)}
        onClick={makeEventHandler(props.onClick, index)}
        onFocus={makeEventHandler(props.onFocus, index)}
        onKeyDown={makeEventHandler(props.onKeyDown, index)}
        onMouseOver={makeEventHandler(props.onMouseOver, index)}
        onMouseOut={makeEventHandler(props.onMouseOut, index)}
      />
    );
  });

  if (props.background) {
    paths.unshift(
      <ReactMinimalPieChartPath
        cx={cx}
        cy={cy}
        key="bg"
        lengthAngle={props.lengthAngle}
        lineWidth={lineWidth}
        radius={radius}
        rounded={props.rounded}
        startAngle={props.startAngle}
        stroke={props.background}
      />
    );
  }

  return paths;
}
