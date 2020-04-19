import React from 'react';
import type { Props as LabelProps } from './Label';

export type StyleObject = {
  [key: string]: string | number;
};

export type EventHandler<Event> = (
  event: Event,
  data: Data,
  dataIndex: number
) => void;

type LabelPropAsReactElement = React.ReactElement<LabelProps>;
type LabelPropAsFunction = (
  labelProps: LabelProps
) => number | string | React.ReactElement;

export type LabelProp = boolean | LabelPropAsReactElement | LabelPropAsFunction;

export type DataEntry = {
  title?: string | number;
  color: string;
  value: number;
  key?: string | number;
  style?: StyleObject;
  [key: string]: any;
};

type ExtendedDataEntry = DataEntry & {
  degrees: number;
  startOffset: number;
  percentage: number;
};

export type Data = DataEntry[];
export type ExtendedData = ExtendedDataEntry[];
