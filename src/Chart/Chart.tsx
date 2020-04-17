import React, { Component } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import extendData from './extendData';
import renderLabels from './renderLabels';
import renderSegments from './renderSegments';
import type {
  Data,
  EventHandler,
  LabelProp,
  StyleObject,
} from '../commonTypes';

// @NOTE Excluding defaultProps entries causing typing bugs
export type Props = Omit<typeof ReactMinimalPieChart.defaultProps, 'label'> & {
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  background?: string;
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
};

export default class ReactMinimalPieChart extends Component<Props> {
  static displayName = 'ReactMinimalPieChart';
  static defaultProps = {
    animate: false,
    animationDuration: 500,
    animationEasing: 'ease-out',
    cx: 50,
    cy: 50,
    label: false,
    labelPosition: 50,
    lengthAngle: 360,
    lineWidth: 100,
    paddingAngle: 0,
    radius: 50,
    rounded: false,
    startAngle: 0,
    viewBoxSize: [100, 100],
  };

  revealOverride?: null | number;
  animationTimerId?: null | number;
  animationRAFId?: null | number;

  constructor(props: Props) {
    super(props);

    if (props.animate === true) {
      this.revealOverride = 0;
    }
  }

  componentDidMount() {
    if (this.props.animate === true && requestAnimationFrame) {
      this.animationTimerId = setTimeout(() => {
        this.animationTimerId = null;
        this.animationRAFId = requestAnimationFrame(() => {
          this.animationRAFId = null;
          this.startAnimation();
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.animationTimerId) {
      clearTimeout(this.animationTimerId);
    }
    if (this.animationRAFId) {
      cancelAnimationFrame(this.animationRAFId);
    }
  }

  startAnimation() {
    this.revealOverride = null;
    this.forceUpdate();
  }

  render() {
    const props = this.props;
    if (props.data === undefined) {
      return null;
    }
    const extendedData = extendData(props);

    return (
      <div className={props.className} style={props.style}>
        <svg
          viewBox={`0 0 ${props.viewBoxSize[0]} ${props.viewBoxSize[1]}`}
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        >
          {renderSegments(extendedData, props, this.revealOverride)}
          {props.label && renderLabels(extendedData, props)}
          {props.injectSvg && props.injectSvg()}
        </svg>
        {props.children}
      </div>
    );
  }
}
