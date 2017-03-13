import React, { PropTypes } from 'react';
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

const makeSingleSegmentPath = (startAngle = 0, lengthDegrees = 0, radius) => {
  // Let svg-partial-circle evaluate "d" value
  return partialCircle(
      VIEWBOX_HALF_SIZE, VIEWBOX_HALF_SIZE,     // center X and Y
      radius,                                   // radius
      degreesToRadians(startAngle),
      degreesToRadians(startAngle + lengthDegrees),
  )
  .map(command => command.join(' '))
  .join(' ');
};

const makeSegments = (data, props) => {
  const radius = VIEWBOX_HALF_SIZE - (props.lineWidth / 2);
  let degreesAccumulator = 0;

  return data.map((dataEntry, index) => {
    let strokeDasharray;
    let strokeDashoffset;

    const segmentPath = makeSingleSegmentPath(
      degreesAccumulator + props.startAngle,
      dataEntry.degrees,
      radius,
    );

    if(!isNaN(props.hidden)) {
      strokeDasharray = ((PI * radius) / 180) * (dataEntry.degrees);
      strokeDashoffset = ((strokeDasharray * -1) / 100) * props.hidden;
    }

    // Keep track of how many degrees have already been taken
    degreesAccumulator += dataEntry.degrees;
    console.log(dataEntry);
    return (
      <path
        d={segmentPath}
        key={dataEntry.key}
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

export default function CheapGoalPie(props) {
  if (props.data === undefined) {
    return null;
  }

  const normalizedData = evaluateDegreesFromValues(
    props.data,
    props.endAngle - props.startAngle,
    props.totalValue
  );

  return (
    <div
      className={props.className}
      style={props.style}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        width="100%"
        height="100%"
      >
        {makeSegments(normalizedData, props)}
      </svg>
    </div>
  );
}

CheapGoalPie.displayName = 'CheapGoalPie';

CheapGoalPie.propTypes = {
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
  lineWidth: PropTypes.number,
  rounded: PropTypes.bool,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  animate: PropTypes.bool,
  hidden: PropTypes.number,
};

CheapGoalPie.defaultProps = {
  startAngle: 0,
  endAngle: 360,
  lineWidth: 100,
};
