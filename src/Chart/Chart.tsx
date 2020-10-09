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
import type { Data, EventHandler, LabelRenderFunction } from '../commonTypes';

type Props = {
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  background?: string;
  center?: [number, number];
  children?: ReactNode;
  className?: string;
  data: Data;
  lengthAngle?: number;
  lineWidth?: number;
  label?: LabelRenderFunction;
  labelPosition?: number;
  labelStyle?:
    | CSSProperties
    | ((dataIndex: number) => CSSProperties | undefined);
  onBlur?: EventHandler<FocusEvent>;
  onClick?: EventHandler<MouseEvent>;
  onFocus?: EventHandler<FocusEvent>;
  onKeyDown?: EventHandler<KeyboardEvent>;
  onMouseOut?: EventHandler<MouseEvent>;
  onMouseOver?: EventHandler<MouseEvent>;
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

const defaultProps = {
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

export type PropsWithDefaults = Props & typeof defaultProps;

export function ReactMinimalPieChart(props: PropsWithDefaults) {
  const [revealOverride, setRevealOverride] = useState(
    props.animate ? 0 : null
  );
  useEffect(() => {
    if (props.animate) {
      return startInitialAnimation();
    }

    function startInitialAnimation() {
      let animationTimerId: number | null;
      let animationRAFId: number | null;
      animationTimerId = setTimeout(() => {
        animationTimerId = null;
        animationRAFId = requestAnimationFrame(() => {
          animationRAFId = null;
          setRevealOverride(null); // Start animation
        });
      });

      return () => {
        animationTimerId && clearTimeout(animationTimerId);
        animationRAFId && cancelAnimationFrame(animationRAFId);
      };
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
      {props.label && renderLabels(extendedData, props)}
      {props.children}
    </svg>
  );
}

ReactMinimalPieChart.defaultProps = defaultProps;
