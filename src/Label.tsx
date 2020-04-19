import React from 'react';
import type { ReactNode } from 'react';
import type { ExtendedDataEntry, StyleObject } from './commonTypes';

export type LabelRenderProps = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  dataEntry: ExtendedDataEntry;
  dataIndex: number;
  style?: StyleObject;
};

type Props = LabelRenderProps & {
  children: ReactNode;
};

export default function Label({ dataEntry, dataIndex, ...props }: Props) {
  return <text dominantBaseline="central" {...props} />;
}

Label.displayName = 'ReactMinimalPieChartLabel';
