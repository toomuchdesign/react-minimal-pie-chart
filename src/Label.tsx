import React from 'react';
import type { CSSProperties, SVGProps } from 'react';
import type {
  ExtendedData,
  BaseDataEntry,
  LabelRenderFunction,
} from './commonTypes';

export type LabelRenderProps<DataEntry extends BaseDataEntry> = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: 'start' | 'middle' | 'end' | 'inherit' | undefined;
  dataEntry: ExtendedData<DataEntry>[number];
  dataIndex: number;
  style?: CSSProperties;
};

export default function ReactMinimalPieChartLabel<
  DataEntry extends BaseDataEntry,
>({
  renderLabel,
  labelProps,
}: {
  renderLabel: LabelRenderFunction<DataEntry>;
  labelProps: LabelRenderProps<DataEntry>;
}) {
  const label = renderLabel(labelProps);

  // Default label
  if (typeof label === 'string' || typeof label === 'number') {
    const { dataEntry, dataIndex, ...props } = labelProps;
    return (
      <text dominantBaseline="central" {...props}>
        {label}
      </text>
    );
  }

  if (React.isValidElement(label)) {
    return label;
  }

  return null;
}
