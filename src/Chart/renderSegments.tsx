import React from 'react';
import type { CSSProperties, SyntheticEvent } from 'react';
import Path from '../Path';
import { extractPercentage, functionProp, isNumber } from '../utils';
import type { ExtendedData, BaseDataEntry } from '../commonTypes';
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

function getRevealValue({
  reveal,
  animate,
}: Pick<ChartProps, 'reveal' | 'animate'>) {
  //@NOTE When animation is on, chart has to be fully revealed when reveal is not set
  if (animate && !isNumber(reveal)) {
    return 100;
  }
  return reveal;
}

function makeEventHandler<
  Event extends SyntheticEvent,
  Payload,
  EventHandler extends (event: Event, payload: Payload) => void
>(eventHandler: undefined | EventHandler, payload: Payload) {
  return (
    eventHandler &&
    ((e: Event) => {
      eventHandler(e, payload);
    })
  );
}

export default function renderSegments<DataEntry extends BaseDataEntry>(
  data: ExtendedData<DataEntry>,
  props: ChartProps<DataEntry>,
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
      <Path
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
      <Path
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
