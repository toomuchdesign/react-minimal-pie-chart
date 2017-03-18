import React, { Component, PropTypes } from 'react';
import Path from './ReactMinimalPieChartPath';

const VIEWBOX_SIZE = 200;
const VIEWBOX_HALF_SIZE = VIEWBOX_SIZE / 2;

const sumValues = data => data.reduce((acc, dataEntry) => acc + dataEntry.value, 0);

const evaluateDegreesFromValues = (data, totalAngle, totalValue) => {
  const total = totalValue || sumValues(data);
  if (totalAngle > 360) { totalAngle = 360 };
  if (totalAngle < -360) { totalAngle = -360 };

  // Append "degrees" property into each data entry
  return data.map(dataEntry => Object.assign(
    { degrees: (dataEntry.value / total) * Math.abs(totalAngle) },
    dataEntry,
  ));
};

const makePathTransitionStyle = (duration, easing) => ({
  transition: `stroke-dashoffset ${duration}ms ${easing}`,
});

const makeSegments = (data, props, hide) => {
  // Keep track of how many degrees have already been taken
  let lastPathAngle = props.startAngle;
  let reveal;
  const style = props.animate && makePathTransitionStyle(props.animationDuration, props.animationEasing);

  // Hide/reveal a path segment?
  if (hide === true) {
    reveal = 0;
  } else if (typeof props.reveal === 'number') {
    reveal = props.reveal;
  } else if (hide === false) {
    reveal = 100;
  }

  return data.map((dataEntry, index) => {
    const startAngle = lastPathAngle;
    lastPathAngle += dataEntry.degrees;

    return (
      <Path
        key={dataEntry.key || index}
        cx={VIEWBOX_HALF_SIZE}
        cy={VIEWBOX_HALF_SIZE}
        startAngle={startAngle}
        lengthAngle={dataEntry.degrees}
        radius={VIEWBOX_HALF_SIZE}
        lineWidth={props.lineWidth}
        paddingAngle={props.paddingAngle}
        reveal={reveal}
        style={style}
        stroke={dataEntry.color}
        strokeLinecap={props.rounded ? 'round' : undefined}
        fill="none"
      />
    );
  });
};

export default class ReactMinimalPieChart extends Component {

  constructor(props) {
    super(props);

    if (this.props.animate === true) {
      this.hidePaths = true;
    }
  }

  componentDidMount() {
    if (this.props.animate === true && requestAnimationFrame) {
      setTimeout(
        () => requestAnimationFrame(
          this.startAnimation.bind(this)
        )
      );
    }
  }

  startAnimation() {
    this.hidePaths = false;
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
    );

    return (
      <div
        className={this.props.className}
        style={this.props.style}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          width="100%"
          height="100%"
        >
          {makeSegments(normalizedData, this.props, this.hidePaths)}
        </svg>
      </div>
    );
  }
}

ReactMinimalPieChart.displayName = 'ReactMinimalPieChart';

ReactMinimalPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      key: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      color: PropTypes.string,
    }),
  ),
  totalValue: PropTypes.number,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
  startAngle: PropTypes.number,
  lengthAngle: PropTypes.number,
  paddingAngle: PropTypes.number,
  lineWidth: PropTypes.number,
  rounded: PropTypes.bool,
  animate: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  reveal: PropTypes.number,
};

ReactMinimalPieChart.defaultProps = {
  startAngle: 0,
  lengthAngle: 360,
  lineWidth: 100,
  rounded: false,
  animate: false,
  animationDuration: 500,
  animationEasing: 'ease-out',
};
