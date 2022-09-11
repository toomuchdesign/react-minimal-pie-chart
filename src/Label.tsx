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
  textAnchor: string;
  dataEntry: ExtendedData<DataEntry>[number];
  dataIndex: number;
  style?: CSSProperties;
};

function ReactMinimalPieChartDefaultLabel<DataEntry extends BaseDataEntry>({
  dataEntry,
  dataIndex,
  ...props
}: SVGProps<SVGTextElement> & LabelRenderProps<DataEntry>) {
  return <text dominantBaseline="central" {...props} />;
}

export default function ReactMinimalPieChartLabel<
  DataEntry extends BaseDataEntry
>({
  renderLabel,
  labelProps,
}: {
  renderLabel: LabelRenderFunction<DataEntry>;
  labelProps: LabelRenderProps<DataEntry>;
}) {
  const label = renderLabel(labelProps);
  if (typeof label === 'string' || typeof label === 'number') {
    return (
      <ReactMinimalPieChartDefaultLabel
        key={`label-${labelProps.dataEntry.key || labelProps.dataIndex}`}
        {...labelProps}
      >
        {label}
      </ReactMinimalPieChartDefaultLabel>
    );
  }

  if (React.isValidElement(label)) {
    return label;
  }

  return null;
}
