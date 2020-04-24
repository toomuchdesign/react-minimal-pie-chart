import React from 'react';
import type { CSSProperties, SVGProps } from 'react';
import type { ExtendedDataEntry } from './commonTypes';

export type LabelRenderProps = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  dataEntry: ExtendedDataEntry;
  dataIndex: number;
  style?: CSSProperties;
};

type Props = SVGProps<SVGTextElement> & LabelRenderProps;

export default function Label({ dataEntry, dataIndex, ...props }: Props) {
  return <text dominantBaseline="central" {...props} />;
}

Label.displayName = 'ReactMinimalPieChartLabel';
