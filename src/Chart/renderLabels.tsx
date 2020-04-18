import React from 'react';
import DefaultLabel from '../Label';
import {
  bisectorAngle,
  extractPercentage,
  functionProp,
  shiftVectorAlongAngle,
} from '../utils';
import type { PropsWithDefaults as ChartProps } from './Chart';
import type { Props as LabelProps } from '../Label';
import type { ExtendedData, LabelRenderFunction } from '../commonTypes';

function round(number: number): number {
  const divisor = 1e14; // 14 decimals
  return Math.round((number + Number.EPSILON) * divisor) / divisor;
}

function evaluateTextAnchorPosition({
  labelPosition,
  lineWidth,
  labelHorizontalShift,
}: {
  labelPosition: number;
  lineWidth: number;
  labelHorizontalShift: number;
}) {
  const dx = round(labelHorizontalShift);
  // Label in the vertical center
  if (dx === 0) {
    return 'middle';
  }
  // Outward label
  if (labelPosition > 100) {
    return dx > 0 ? 'start' : 'end';
  }
  // Inward label
  const innerRadius = 100 - lineWidth;
  if (labelPosition < innerRadius) {
    return dx > 0 ? 'end' : 'start';
  }
  // Overlying label
  return 'middle';
}

function renderLabelElement(
  renderLabel: LabelRenderFunction,
  labelProps: LabelProps
): JSX.Element | null {
  const label = renderLabel(labelProps);
  if (typeof label === 'string' || typeof label === 'number') {
    return <DefaultLabel {...labelProps}>{label}</DefaultLabel>;
  }

  if (React.isValidElement(label)) {
    return label;
  }
  return null;
}

export default function renderLabels(data: ExtendedData, props: ChartProps) {
  return data.map((dataEntry, index) => {
    const segmentsShift = functionProp(props.segmentsShift, index) ?? 0;
    const distanceFromCenter =
      extractPercentage(props.radius, props.labelPosition) + segmentsShift;
    const startAngle = props.startAngle + dataEntry.startOffset;
    const segmentBisector = bisectorAngle(startAngle, dataEntry.degrees);
    const { dx, dy } = shiftVectorAlongAngle(
      segmentBisector,
      distanceFromCenter
    );

    // This object is passed as argument to the "label" function prop
    const labelProps = {
      key: `label-${dataEntry.key || index}`,
      x: props.cx,
      y: props.cy,
      dx,
      dy,
      textAnchor: evaluateTextAnchorPosition({
        labelPosition: props.labelPosition,
        lineWidth: props.lineWidth,
        labelHorizontalShift: dx,
      }),
      data,
      dataIndex: index,
      color: dataEntry.color,
      style: props.labelStyle,
    };

    return props.label && renderLabelElement(props.label, labelProps);
  });
}
