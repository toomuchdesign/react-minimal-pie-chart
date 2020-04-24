import type { ReactElement } from 'react';
import type { LabelRenderProps } from './Label';

export type EventHandler<Event> = (event: Event, dataIndex: number) => void;

export type LabelRenderFunction = (
  labelRenderProps: LabelRenderProps
) => number | string | ReactElement | undefined | null;

export type DataEntry = {
  title?: string | number;
  color: string;
  value: number;
  key?: string | number;
  [key: string]: any;
};

export type ExtendedDataEntry = DataEntry & {
  degrees: number;
  startAngle: number;
  percentage: number;
};

export type Data = DataEntry[];
export type ExtendedData = ExtendedDataEntry[];
