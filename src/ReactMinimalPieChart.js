import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Path from './ReactMinimalPieChartPath';
import DefaultLabel from './ReactMinimalPieChartLabel';
import { degreesToRadians, evaluateViewBoxSize } from './utils';

const VIEWBOX_SIZE = 100;
const VIEWBOX_HALF_SIZE = VIEWBOX_SIZE / 2;

const sumValues = data =>
  data.reduce((acc, dataEntry) => acc + dataEntry.value, 0);

// @TODO extract padding evaluation
const evaluateDegreesFromValues = (
  data,
  totalAngle,
  totalValue,
  paddingAngle
) => {
  const total = totalValue || sumValues(data);

  // Remove segments padding from total degrees
  const degreesTakenByPadding = paddingAngle * data.length;
  let totalDegrees = Math.abs(totalAngle) - degreesTakenByPadding;

  if (totalDegrees > 360) totalDegrees = 360;
  if (totalAngle < 0) totalDegrees = -totalDegrees;

  // Append "degrees" and "percentage" into each data entry
  return data.map(dataEntry =>
    Object.assign(
      {
        degrees: (dataEntry.value / total) * totalDegrees,
        percentage: (100 * dataEntry.value) / total,
      },
      dataEntry
    )
  );
};

const makeSegmentTransitionStyle = (duration, easing, furtherStyles = {}) => {
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
};

const makeSegments = (data, props, hide) => {
  // Keep track of how many degrees have already been taken
  let lastSegmentAngle = props.startAngle;
  const segmentsPaddingAngle =
    props.paddingAngle * (props.lengthAngle / Math.abs(props.lengthAngle));
  let reveal;

  let style = props.segmentsStyle;

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

  return data.map((dataEntry, index) => {
    const startAngle = lastSegmentAngle;
    const lengthAngle = dataEntry.degrees;
    lastSegmentAngle += lengthAngle + segmentsPaddingAngle;

    return (
      <Path
        key={dataEntry.key || index}
        cx={props.cx}
        cy={props.cy}
        startAngle={startAngle}
        lengthAngle={lengthAngle}
        radius={props.radius}
        lineWidth={(props.radius / 100) * props.lineWidth}
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
  });
};

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

  return <DefaultLabel {...props}>{() => label}</DefaultLabel>;
}

const makeLabels = (data, props) => {
  // Keep track of how many degrees have already been taken
  let lastSegmentAngle = props.startAngle;
  const segmentsPaddingAngle =
    props.paddingAngle * (props.lengthAngle / Math.abs(props.lengthAngle));
  const labelRadius = props.labelRadius || props.radius / 2;

  return data.map((dataEntry, index) => {
    const startAngle = lastSegmentAngle;
    const lengthAngle = dataEntry.degrees;
    lastSegmentAngle += lengthAngle + segmentsPaddingAngle;
    const halfAngle = startAngle + lengthAngle / 2;
    const halfAngleRadians = degreesToRadians(halfAngle);
    // This object is passes as argument to "label" prop
    const labelProps = {
      key: `label-${dataEntry.key || index}`,
      x: props.cx,
      y: props.cy,
      dx: Math.cos(halfAngleRadians) * labelRadius,
      dy: Math.sin(halfAngleRadians) * labelRadius,
      data: data,
      dataIndex: index,
      style: props.labelStyle,
    };

    return renderLabelItem(props.label, labelProps, dataEntry.value);
  });
};

export default class ReactMinimalPieChart extends PureComponent {
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
      this.props.totalValue,
      this.props.paddingAngle
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
          {makeSegments(normalizedData, this.props, this.hideSegments)}
          {this.props.label && makeLabels(normalizedData, this.props)}
          {this.props.injectSvg && this.props.injectSvg()}
        </svg>
        {this.props.children}
      </div>
    );
  }
}

ReactMinimalPieChart.displayName = 'ReactMinimalPieChart';

ReactMinimalPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      value: PropTypes.number.isRequired,
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      color: PropTypes.string,
    })
  ),
  cx: PropTypes.number,
  cy: PropTypes.number,
  ratio: PropTypes.number,
  totalValue: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  segmentsStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
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
  labelRadius: PropTypes.number,
  labelStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
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
  onMouseOver: undefined,
  onMouseOut: undefined,
  onClick: undefined,
};
