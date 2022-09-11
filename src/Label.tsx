import React from 'react';
import type { CSSProperties, SVGProps } from 'react';
import type { ExtendedData, BaseDataEntry } from './commonTypes';

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

type Props<DataEntry extends BaseDataEntry> = SVGProps<SVGTextElement> &
  LabelRenderProps<DataEntry>;

export default function ReactMinimalPieChartLabel<
  DataEntry extends BaseDataEntry
>({ dataEntry, dataIndex, ...props }: Props<DataEntry>) {
  return <text dominantBaseline="central" {...props} />;
}
