import React from 'react';
import DefaultLabel from '../Label';
import {
  evaluateLabelTextAnchor,
  extractPercentage,
  extractAbsoluteCoordinates,
  bisectorAngle,
  shiftVectorAlongAngle,
} from '../utils';
import type { Props as LabelProps } from '../Label';
import type { ExtendedData, LabelProp } from '../commonTypes';
import type { Props as ChartProps } from './Chart';

function renderLabelItem(
  option: LabelProp,
  labelProps: LabelProps,
  value: number
) {
  if (React.isValidElement(option)) {
    return React.cloneElement(option, labelProps);
  }

  let label: number | string | React.ReactElement = value;
  if (typeof option === 'function') {
    label = option(labelProps);
    if (React.isValidElement(label)) {
      return label;
    }
  }

  return <DefaultLabel {...labelProps}>{label}</DefaultLabel>;
}

export default function renderLabels(data: ExtendedData, props: ChartProps) {
  const { cx, cy, radius, segmentsShift } = extractAbsoluteCoordinates(props);
  return data.map((dataEntry, index) => {
    const segmentShift =
      dataEntry.shift === undefined
        ? segmentsShift
        : extractPercentage(radius, dataEntry.shift);
    const labelPosition =
      extractPercentage(radius, props.labelPosition) + segmentShift;
    const startAngle = props.startAngle + dataEntry.startOffset;
    const segmentBisector = bisectorAngle(startAngle, dataEntry.degrees);
    const { dx, dy } = shiftVectorAlongAngle(segmentBisector, labelPosition);

    // This object is passed as props to the "label" component
    const labelProps = {
      key: `label-${dataEntry.key || index}`,
      x: cx,
      y: cy,
      dx,
      dy,
      textAnchor: evaluateLabelTextAnchor({
        labelPosition: props.labelPosition,
        lineWidth: props.lineWidth,
        labelHorizontalShift: dx,
      }),
      data: data,
      dataIndex: index,
      color: dataEntry.color,
      style: props.labelStyle,
    };

    return renderLabelItem(props.label, labelProps, dataEntry.value);
  });
}
