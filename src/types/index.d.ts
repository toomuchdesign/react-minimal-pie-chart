import * as React from 'react';

declare type StyleObject = {
  [key: string]: string | number;
};

export type PieChartData = {
  title?: string | number;
  color: string;
  value: number;
  key?: string | number;
  style?: StyleObject;
  [key: string]: any;
};

export type ExtendedPieChartData = PieChartData & {
  degrees: number;
  startOffset: number;
  percentage: number;
};

export type LabelProps = {
  key: string | number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  data: ExtendedPieChartData[];
  dataIndex: number;
  color: string;
  style: StyleObject;
};

declare type LabelPropAsReactElement = React.ReactElement<LabelProps>;

declare type LabelPropAsFunction = (
  labelProps: LabelProps
) => number | string | React.ReactElement;

declare type EventHandler = (
  event: React.MouseEvent,
  data: PieChartData[],
  dataIndex: number
) => any;

declare type ChartProps = {
  className?: string;
  style?: StyleObject;
  data: PieChartData[];
  cx?: number;
  cy?: number;
  viewBoxSize?: [number, number];
  startAngle?: number;
  lengthAngle?: number;
  totalValue?: number;
  radius?: number;
  lineWidth?: number;
  paddingAngle?: number;
  rounded?: boolean;
  segmentsStyle?: StyleObject;
  background?: string;
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  reveal?: number;
  injectSvg?: () => React.ReactElement | void;
  label?: boolean | LabelPropAsReactElement | LabelPropAsFunction;
  labelPosition?: number;
  labelStyle?: StyleObject;
  onClick?: EventHandler;
  onMouseOver?: EventHandler;
  onMouseOut?: EventHandler;
};

export default class ReactMinimalPieChart extends React.Component<ChartProps> {}
