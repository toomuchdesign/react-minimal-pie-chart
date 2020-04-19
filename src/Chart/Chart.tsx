import React, { useState, useEffect } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import extendData from './extendData';
import renderLabels from './renderLabels';
import renderSegments from './renderSegments';
import type {
  Data,
  EventHandler,
  LabelProp,
  StyleObject,
} from '../commonTypes';

export type Props = {
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  background?: string;
  children?: ReactNode;
  className?: string;
  cx?: number;
  cy?: number;
  data: Data;
  lengthAngle?: number;
  lineWidth?: number;
  injectSvg?: () => React.ReactElement | void;
  label?: LabelProp;
  labelPosition?: number;
  labelStyle?: StyleObject;
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
    | StyleObject
    | ((dataIndex: number) => StyleObject | undefined);
  segmentsTabIndex?: number;
  startAngle?: number;
  style?: StyleObject;
  totalValue?: number;
  viewBoxSize?: [number, number];
  // @NOTE excluding defaultProps entries due to issues on how TS inferres types
  // Current strategy doesn't work with optional props with multiple types (eg number | string)
} & Omit<typeof defaultProps, 'label'>;

const defaultProps = {
  animate: false,
  animationDuration: 500,
  animationEasing: 'ease-out',
  cx: 50,
  cy: 50,
  label: false,
  data: [] as Data,
  labelPosition: 50,
  lengthAngle: 360,
  lineWidth: 100,
  paddingAngle: 0,
  radius: 50,
  rounded: false,
  startAngle: 0,
  viewBoxSize: [100, 100],
};

export default function ReactMinimalPieChart(props: Props) {
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
    <div className={props.className} style={props.style}>
      <svg
        viewBox={`0 0 ${props.viewBoxSize[0]} ${props.viewBoxSize[1]}`}
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      >
        {renderSegments(extendedData, props, revealOverride)}
        {props.label && renderLabels(extendedData, props)}
        {props.injectSvg && props.injectSvg()}
      </svg>
      {props.children}
    </div>
  );
}

ReactMinimalPieChart.displayName = 'ReactMinimalPieChart';
ReactMinimalPieChart.defaultProps = defaultProps;
