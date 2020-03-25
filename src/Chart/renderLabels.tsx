import React from 'react';
import { default as DefaultLabel, Props as LabelProps } from '../Label';
import {
  degreesToRadians,
  evaluateLabelTextAnchor,
  extractPercentage,
  extractAbsoluteCoordinates,
} from '../utils';
import { ExtendedData, LabelProp } from '../commonTypes';
import { Props as ChartProps } from './index';

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
  const { cx, cy, radius } = extractAbsoluteCoordinates(props);
  const labelPosition = extractPercentage(radius, props.labelPosition);

  return data.map((dataEntry, index) => {
    const startAngle = props.startAngle + dataEntry.startOffset;
    const halfAngle = startAngle + dataEntry.degrees / 2;
    const halfAngleRadians = degreesToRadians(halfAngle);
    const dx = Math.cos(halfAngleRadians) * labelPosition;
    const dy = Math.sin(halfAngleRadians) * labelPosition;

    // This object is passed as props to the "label" component
    const labelProps = {
      key: `label-${dataEntry.key || index}`,
      x: cx,
      y: cy,
      dx,
      dy,
      textAnchor: evaluateLabelTextAnchor({
        lineWidth: props.lineWidth,
        labelPosition: props.labelPosition,
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
