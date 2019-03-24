import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Path from './ReactMinimalPieChartPath';
import DefaultLabel from './ReactMinimalPieChartLabel';
import { dataPropType, stylePropType } from './propTypes';
import {
  degreesToRadians,
  evaluateViewBoxSize,
  evaluateLabelTextAnchor,
  extractPercentage,
  valueBetween,
} from './utils';

const VIEWBOX_SIZE = 100;
const VIEWBOX_HALF_SIZE = VIEWBOX_SIZE / 2;

function sumValues(data) {
  return data.reduce((acc, dataEntry) => acc + dataEntry.value, 0);
}

function evaluateDegreesFromValues(data, totalAngle, totalValue) {
  const total = totalValue || sumValues(data);
  const normalizedTotalAngle = valueBetween(totalAngle, -360, 360);

  // Append "degrees" and "percentage" into each data entry
  return data.map(dataEntry => {
    const valueInPercentage = (dataEntry.value / total) * 100;
    return {
      percentage: valueInPercentage,
      degrees: extractPercentage(normalizedTotalAngle, valueInPercentage),
      ...dataEntry,
    };
  });
}

function makeSegmentTransitionStyle(duration, easing, furtherStyles = {}) {
  // Merge CSS transition necessary for chart animation with the ones provided by "segmentsStyle"
  const transition = [
    `stroke-dashoffset ${duration}ms ${easing}`,
    furtherStyles.transition,
  ]
    .filter(Boolean)
    .join(',');

  return {
    transition,
  };
}

function renderLabelItem(option, props, value) {
  if (React.isValidElement(option)) {
    return React.cloneElement(option, props);
  }

  let label = value;
  if (typeof option === 'function') {
    label = option(props);
    if (React.isValidElement(label)) {
      return label;
    }
  }

  return <DefaultLabel {...props}>{label}</DefaultLabel>;
}

function renderLabel(
  data,
  dataIndex,
  props,
  startAngle,
  labelPosition,
  paddingAngle
) {
  const dataEntry = data[dataIndex];
  const lengthAngle = dataEntry.degrees;
  const halfAngle = startAngle + (lengthAngle - paddingAngle) / 2;
  const halfAngleRadians = degreesToRadians(halfAngle);
  const dx = Math.cos(halfAngleRadians) * labelPosition;
  const dy = Math.sin(halfAngleRadians) * labelPosition;

  const labelProps = {
    key: `label-${dataEntry.key || dataIndex}`,
    x: props.cx,
    y: props.cy,
    dx,
    dy,
    textAnchor: evaluateLabelTextAnchor({
      lineWidth: props.lineWidth,
      labelPosition: props.labelPosition,
      labelHorizontalShift: dx,
    }),
    data: data,
    dataIndex,
    color: dataEntry.color,
    style: props.labelStyle,
  };

  return renderLabelItem(props.label, labelProps, dataEntry.value);
}

function renderSegments(data, props, hide) {
  // Keep track of how many degrees have already been taken
  let lastSegmentAngle = props.startAngle;
  const paddingAngle = props.paddingAngle * Math.sign(props.lengthAngle);
  const labelPosition = extractPercentage(props.radius, props.labelPosition);
  let reveal;
  let style = props.segmentsStyle;
  const paths = [];
  const labels = [];

  if (props.animate) {
    const transitionStyle = makeSegmentTransitionStyle(
      props.animationDuration,
      props.animationEasing,
      style
    );
    style = Object.assign({}, style, transitionStyle);
  }

  // Hide/reveal the segment?
  if (hide === true) {
    reveal = 0;
  } else if (typeof props.reveal === 'number') {
    reveal = props.reveal;
  } else if (hide === false) {
    reveal = 100;
  }

  data.forEach((dataEntry, index) => {
    const startAngle = lastSegmentAngle;
    const lengthAngle = dataEntry.degrees;
    lastSegmentAngle += lengthAngle;

    paths.push(
      <Path
        key={dataEntry.key || index}
        cx={props.cx}
        cy={props.cy}
        startAngle={startAngle}
        lengthAngle={lengthAngle - paddingAngle}
        radius={props.radius}
        lineWidth={extractPercentage(props.radius, props.lineWidth)}
        reveal={reveal}
        title={dataEntry.title}
        style={style}
        stroke={dataEntry.color}
        strokeLinecap={props.rounded ? 'round' : undefined}
        fill="none"
        onMouseOver={
          props.onMouseOver && (e => props.onMouseOver(e, props.data, index))
        }
        onMouseOut={
          props.onMouseOut && (e => props.onMouseOut(e, props.data, index))
        }
        onClick={props.onClick && (e => props.onClick(e, props.data, index))}
      />
    );

    if (props.label) {
      labels.push(
        renderLabel(data, index, props, startAngle, labelPosition, paddingAngle)
      );
    }
  });

  return [...paths, ...labels];
}

export default class ReactMinimalPieChart extends Component {
  constructor(props) {
    super(props);

    if (this.props.animate === true) {
      this.hideSegments = true;
    }
  }

  componentDidMount() {
    if (this.props.animate === true && requestAnimationFrame) {
      this.initialAnimationTimerId = setTimeout(() => {
        this.initialAnimationTimerId = null;
        this.initialAnimationRAFId = requestAnimationFrame(() => {
          (this.initialAnimationRAFId = null), this.startAnimation();
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
    this.hideSegments = false;
    this.forceUpdate();
  }

  render() {
    if (this.props.data === undefined) {
      return null;
    }

    const normalizedData = evaluateDegreesFromValues(
      this.props.data,
      this.props.lengthAngle,
      this.props.totalValue
    );

    return (
      <div
        className={this.props.className}
        style={this.props.style}
      >
        <svg
          viewBox={evaluateViewBoxSize(this.props.ratio, VIEWBOX_SIZE)}
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        >
          {renderSegments(normalizedData, this.props, this.hideSegments)}
          {this.props.injectSvg && this.props.injectSvg()}
        </svg>
        {this.props.children}
      </div>
    );
  }
}

ReactMinimalPieChart.displayName = 'ReactMinimalPieChart';

ReactMinimalPieChart.propTypes = {
  data: dataPropType,
  cx: PropTypes.number,
  cy: PropTypes.number,
  ratio: PropTypes.number,
  totalValue: PropTypes.number,
  className: PropTypes.string,
  style: stylePropType,
  segmentsStyle: stylePropType,
  startAngle: PropTypes.number,
  lengthAngle: PropTypes.number,
  paddingAngle: PropTypes.number,
  lineWidth: PropTypes.number,
  radius: PropTypes.number,
  rounded: PropTypes.bool,
  animate: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  reveal: PropTypes.number,
  children: PropTypes.node,
  injectSvg: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool,
  ]),
  labelPosition: PropTypes.number,
  labelStyle: stylePropType,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onClick: PropTypes.func,
};

ReactMinimalPieChart.defaultProps = {
  cx: VIEWBOX_HALF_SIZE,
  cy: VIEWBOX_HALF_SIZE,
  ratio: 1,
  startAngle: 0,
  lengthAngle: 360,
  paddingAngle: 0,
  lineWidth: 100,
  radius: VIEWBOX_HALF_SIZE,
  rounded: false,
  animate: false,
  animationDuration: 500,
  animationEasing: 'ease-out',
  label: false,
  labelPosition: 50,
  onMouseOver: undefined,
  onMouseOut: undefined,
  onClick: undefined,
};
