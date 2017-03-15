import React, { Component, PropTypes } from 'react';
import partialCircle from 'svg-partial-circle';

const VIEWBOX_SIZE = 200;
const VIEWBOX_HALF_SIZE = VIEWBOX_SIZE / 2;
const PI = Math.PI;

const sumValues = data => data.reduce((acc, dataEntry) => acc + dataEntry.value, 0);

const evaluateDegreesFromValues = (data, totalAngle, totalValue) => {
  const total = totalValue || sumValues(data);

  // Append "degrees" property into each data entry
  return data.map(dataEntry => Object.assign(
    { degrees: (dataEntry.value / total) * totalAngle },
    dataEntry,
  ));
};

const degreesToRadians = degrees => ((degrees * PI) / 180);

const makeSingleSegmentPath = (startAngle = 0, lengthDegrees = 0, radius, paddingAngle = 0) => {
  // Let svg-partial-circle evaluate "d" value
  // Patch: calculating a 360° ring produces a broken path
  const patchedLengthDegrees = lengthDegrees === 360
    ? 359.999
    : lengthDegrees;

  return partialCircle(
      VIEWBOX_HALF_SIZE, VIEWBOX_HALF_SIZE,     // center X and Y
      radius,                                   // radius
      degreesToRadians(startAngle),
      degreesToRadians(startAngle + patchedLengthDegrees - paddingAngle),
  )
  .map(command => command.join(' '))
  .join(' ');
};

const makeTransitionStyleObject = (duration = 0, easing = '') => ({
  transition: `stroke-dashoffset ${duration}ms ${easing}`,
});

const makeSegments = (data, props, hide) => {
  const radius = VIEWBOX_HALF_SIZE - (props.lineWidth / 2);
  let degreesAccumulator = 0;

  return data.map((dataEntry, index) => {
    let strokeDasharray;
    let strokeDashoffset;
    let style;

    const segmentPath = makeSingleSegmentPath(
      degreesAccumulator + props.startAngle,
      dataEntry.degrees,
      radius,
      props.paddingAngle
    );

    // Animate/hide paths with "stroke-dasharray" + "stroke-dashoffset"
    // https://css-tricks.com/svg-line-animation-works/
    if(props.animate || !isNaN(props.hidden)) {
      strokeDasharray = ((PI * radius) / 180) * (dataEntry.degrees);
    }

    if(hide || !isNaN(props.hidden)) {
      const hiddenPercentage = hide ? 100 : props.hidden;
      strokeDashoffset = ((strokeDasharray) / 100) * hiddenPercentage;
    }

    // Keep track of how many degrees have already been taken
    degreesAccumulator += dataEntry.degrees;

    return (
      <path
        d={segmentPath}
        key={dataEntry.key}
        style={props.animate && makeTransitionStyleObject(props.animationDuration, props.animationEasing)}
        stroke={dataEntry.color}
        strokeWidth={props.lineWidth}
        strokeLinecap={props.rounded ? 'round' : undefined}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
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
    if (this.props.animate === true) {
      this.startAnimation();
    }
  }

  startAnimation() {
    setTimeout(() => {
      this.hidePaths = false;
      this.forceUpdate();
    });
  }

  render() {
    if (this.props.data === undefined) {
      return null;
    }

    const normalizedData = evaluateDegreesFromValues(
      this.props.data,
      this.props.endAngle - this.props.startAngle,
      this.props.totalValue
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
  endAngle: PropTypes.number,
  paddingAngle: PropTypes.number,
  lineWidth: PropTypes.number,
  rounded: PropTypes.bool,
  animate: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  hidden: PropTypes.number,
};

ReactMinimalPieChart.defaultProps = {
  startAngle: 0,
  endAngle: 360,
  lineWidth: 100,
  animationDuration: 500,
  animationEasing: 'ease-out',
};
