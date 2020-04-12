import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dataPropType, stylePropType } from '../propTypes';
import extendData from './extendData';
import renderLabels from './renderLabels';
import renderSegments from './renderSegments';
import type {
  Data,
  EventHandler,
  LabelProp,
  StyleObject,
} from '../commonTypes';

export type Props = typeof ReactMinimalPieChart.defaultProps & {
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
  onBlur?: EventHandler;
  onClick?: EventHandler;
  onFocus?: EventHandler;
  onKeyDown?: EventHandler;
  onMouseOut?: EventHandler;
  onMouseOver?: EventHandler;
  paddingAngle?: number;
  radius?: number;
  reveal?: number;
  rounded?: boolean;
  segmentsStyle?: StyleObject;
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
  static propTypes = {
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    background: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    cx: PropTypes.number,
    cy: PropTypes.number,
    data: dataPropType,
    injectSvg: PropTypes.func,
    label: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
      PropTypes.bool,
    ]),
    labelPosition: PropTypes.number,
    labelStyle: stylePropType,
    lengthAngle: PropTypes.number,
    lineWidth: PropTypes.number,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    paddingAngle: PropTypes.number,
    radius: PropTypes.number,
    reveal: PropTypes.number,
    rounded: PropTypes.bool,
    segmentsStyle: stylePropType,
    segmentsTabIndex: PropTypes.number,
    startAngle: PropTypes.number,
    style: stylePropType,
    totalValue: PropTypes.number,
    viewBoxSize: PropTypes.arrayOf(PropTypes.number),
  };

  revealOverride?: null | number;
  initialAnimationTimerId?: null | number;
  initialAnimationRAFId?: null | number;

  constructor(props: Props) {
    super(props);

    if (props.animate === true) {
      this.revealOverride = 0;
    }
  }

  componentDidMount() {
    if (this.props.animate === true && requestAnimationFrame) {
      this.initialAnimationTimerId = setTimeout(() => {
        this.initialAnimationTimerId = null;
        this.initialAnimationRAFId = requestAnimationFrame(() => {
          this.initialAnimationRAFId = null;
          this.startAnimation();
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.initialAnimationTimerId) {
      clearTimeout(this.initialAnimationTimerId);
    }
    if (this.initialAnimationRAFId) {
      cancelAnimationFrame(this.initialAnimationRAFId);
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
