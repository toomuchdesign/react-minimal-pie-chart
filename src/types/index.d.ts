import * as React from 'react';

declare type StyleObject = {
  [key: string]: string | number;
};

export type DataEntry = {
  title: string;
  color: string;
  value: number;
  [key: string]: any;
};

export type ExtendedDataEntry = DataEntry & {
  degrees: number;
  startOffset: number;
  percentage: number;
};

export type LabelProps = {
  key: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  data: ExtendedDataEntry[];
  dataIndex: number;
  color: string;
  style: StyleObject;
};

declare type LabelPropAsReactElement = React.ReactElement<LabelProps>;
declare type LabelPropAsFunction = (labelProps: LabelProps) => number | string;

declare type ChartProps = {
  data: DataEntry[];
  cx?: number;
  cy?: number;
  ratio?: number;
  startAngle?: number;
  lengthAngle?: number;
  totalValue?: number;
  radius?: number;
  lineWidth?: number;
  paddingAngle?: number;
  rounded?: boolean;
  segmentsStyle?: StyleObject;
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  reveal?: number;
  injectSvg?: () => {};
  label?: boolean | LabelPropAsReactElement | LabelPropAsFunction;
  labelPosition?: number;
  labelStyle?: StyleObject;
  onClick?: (
    event: React.MouseEvent,
    data: DataEntry[],
    dataIndex: number
  ) => {};
  onMouseOver?: (
    event: React.MouseEvent,
    data: DataEntry[],
    dataIndex: number
  ) => {};
  onMouseOut?: (
    event: React.MouseEvent,
    data: DataEntry[],
    dataIndex: number
  ) => {};
};

export default class ReactMinimanPieChart extends React.Component<ChartProps> {}
