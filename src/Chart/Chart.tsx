import React, { useState, useEffect } from 'react';
import type {
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';
import extendData from './extendData';
import renderLabels from './renderLabels';
import renderSegments from './renderSegments';
import type { Data, BaseDataEntry, LabelRenderFunction } from '../commonTypes';
import { makePropsWithDefaults } from '../utils';

export type Props<DataEntry extends BaseDataEntry = BaseDataEntry> = {
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  background?: string;
  center?: [number, number];
  children?: ReactNode;
  className?: string;
  data: Data<DataEntry>;
  lengthAngle?: number;
  lineWidth?: number;
  label?: LabelRenderFunction<DataEntry>;
  labelPosition?: number;
  labelStyle?:
    | CSSProperties
    | ((dataIndex: number) => CSSProperties | undefined);
  onBlur?: (event: FocusEvent, dataIndex: number) => void;
  onClick?: (event: MouseEvent, dataIndex: number) => void;
  onFocus?: (event: FocusEvent, dataIndex: number) => void;
  onKeyDown?: (event: KeyboardEvent, dataIndex: number) => void;
  onMouseOut?: (event: MouseEvent, dataIndex: number) => void;
  onMouseOver?: (event: MouseEvent, dataIndex: number) => void;
  paddingAngle?: number;
  radius?: number;
  reveal?: number;
  rounded?: boolean;
  segmentsShift?: number | ((dataIndex: number) => number | undefined);
  segmentsStyle?:
    | CSSProperties
    | ((dataIndex: number) => CSSProperties | undefined);
  segmentsTabIndex?: number;
  startAngle?: number;
  style?: CSSProperties;
  totalValue?: number;
  viewBoxSize?: [number, number];
};

export const defaultProps = {
  animationDuration: 500,
  animationEasing: 'ease-out',
  center: [50, 50] as [number, number],
  data: [] as Data,
  labelPosition: 50,
  lengthAngle: 360,
  lineWidth: 100,
  paddingAngle: 0,
  radius: 50,
  startAngle: 0,
  viewBoxSize: [100, 100] as [number, number],
};

export type PropsWithDefaults<
  DataEntry extends BaseDataEntry
> = Props<DataEntry> & typeof defaultProps;

export function ReactMinimalPieChart<DataEntry extends BaseDataEntry>(
  originalProps: Props<DataEntry>
) {
  const props = makePropsWithDefaults<PropsWithDefaults<DataEntry>>(
    originalProps,
    // @ts-expect-error: defaultProps.data is typed as BaseDataEntry
    defaultProps
  );
  const [revealOverride, setRevealOverride] = useState(
    props.animate ? 0 : null
  );

  useEffect(() => {
    if (props.animate) {
      // Trigger initial animation
      setRevealOverride(null);
    }
  }, []);

  const extendedData = extendData(props);
  return (
    <svg
      viewBox={`0 0 ${props.viewBoxSize[0]} ${props.viewBoxSize[1]}`}
      width="100%"
      height="100%"
      className={props.className}
      style={props.style}
    >
      {renderSegments(extendedData, props, revealOverride)}
      {renderLabels(extendedData, props)}
      {props.children}
    </svg>
  );
}
