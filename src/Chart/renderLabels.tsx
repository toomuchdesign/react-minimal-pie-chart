import React from 'react';
import DefaultLabel from '../Label';
import {
  bisectorAngle,
  extractPercentage,
  functionProp,
  shiftVectorAlongAngle,
} from '../utils';
import type { PropsWithDefaults as ChartProps } from './Chart';
import type { LabelRenderProps } from '../Label';
import type {
  ExtendedData,
  LabelRenderFunction,
  BaseDataEntry,
} from '../commonTypes';

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

function renderLabelElement<DataEntry extends BaseDataEntry>(
  renderLabel: LabelRenderFunction<DataEntry>,
  labelProps: LabelRenderProps<DataEntry>
): JSX.Element | null {
  const label = renderLabel(labelProps);
  if (typeof label === 'string' || typeof label === 'number') {
    return (
      <DefaultLabel
        key={`label-${labelProps.dataEntry.key || labelProps.dataIndex}`}
        {...labelProps}
      >
        {label}
      </DefaultLabel>
    );
  }

  if (React.isValidElement(label)) {
    return label;
  }
  return null;
}

export default function renderLabels<DataEntry extends BaseDataEntry>(
  data: ExtendedData<DataEntry>,
  props: ChartProps<DataEntry>
) {
  return data.map((dataEntry, index) => {
    const segmentsShift = functionProp(props.segmentsShift, index) ?? 0;
    const distanceFromCenter =
      extractPercentage(props.radius, props.labelPosition) + segmentsShift;
    const { dx, dy } = shiftVectorAlongAngle(
      bisectorAngle(dataEntry.startAngle, dataEntry.degrees),
      distanceFromCenter
    );

    // This object is passed as argument to the "label" function prop
    const labelRenderProps = {
      x: props.center[0],
      y: props.center[1],
      dx,
      dy,
      textAnchor: evaluateTextAnchorPosition({
        labelPosition: props.labelPosition,
        lineWidth: props.lineWidth,
        labelHorizontalShift: dx,
      }),
      dataEntry,
      dataIndex: index,
      style: functionProp(props.labelStyle, index),
    };

    return props.label && renderLabelElement(props.label, labelRenderProps);
  });
}
