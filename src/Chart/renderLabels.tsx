import React from 'react';
import DefaultLabel from '../Label';
import {
  bisectorAngle,
  evaluateLabelTextAnchor,
  extractPercentage,
  extractAbsoluteCoordinates,
  functionProp,
  shiftVectorAlongAngle,
} from '../utils';
import type { Props as LabelProps } from '../Label';
import type { ExtendedData, LabelProp } from '../commonTypes';
import type { Props as ChartProps } from './Chart';

function renderLabelItem(
  providedLabel: LabelProp,
  labelProps: LabelProps,
  defaultValue: number
): JSX.Element {
  if (React.isValidElement(providedLabel)) {
    return React.cloneElement(providedLabel, labelProps);
  }

  let labelValue: number | string = defaultValue;
  if (typeof providedLabel === 'function') {
    const label = providedLabel(labelProps);
    if (React.isValidElement(label)) {
      return label;
    }
    labelValue = label;
  }

  return <DefaultLabel {...labelProps}>{labelValue}</DefaultLabel>;
}

export default function renderLabels(data: ExtendedData, props: ChartProps) {
  const { cx, cy, radius } = extractAbsoluteCoordinates(props);
  return data.map((dataEntry, index) => {
    const segmentsShift = functionProp(props.segmentsShift, data, index) ?? 0;
    const distanceFromCenter = extractPercentage(
      radius,
      props.labelPosition + segmentsShift
    );
    const startAngle = props.startAngle + dataEntry.startOffset;
    const segmentBisector = bisectorAngle(startAngle, dataEntry.degrees);
    const { dx, dy } = shiftVectorAlongAngle(
      segmentBisector,
      distanceFromCenter
    );

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
      data,
      dataIndex: index,
      color: dataEntry.color,
      style: props.labelStyle,
    };

    return (
      props.label && renderLabelItem(props.label, labelProps, dataEntry.value)
    );
  });
}
