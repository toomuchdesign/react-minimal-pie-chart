import React from 'react';
import type { ExtendedData, StyleObject } from './commonTypes';

export type Props = {
  key?: string | number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  data: ExtendedData;
  dataIndex: number;
  color: string;
  style?: StyleObject;
};

export default function Label({ data, dataIndex, color, ...props }: Props) {
  return <text dominantBaseline="central" fill={color} {...props} />;
}

Label.displayName = 'ReactMinimalPieChartLabel';
