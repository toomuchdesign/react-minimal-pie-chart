import React, { PropTypes } from 'react';
import partialCircle from 'svg-partial-circle';

const VIEWBOX_SIZE = 200;
const VIEWBOX_HALF_SIZE = VIEWBOX_SIZE / 2;

const sumValues = data => data.reduce((acc, dataEntry) => acc + dataEntry.value, 0);

const evaluateDegreesFromValues = (data, totalAngle, totalValue) => {
  const total = totalValue || sumValues(data);

  // Append "degrees" property into each data entry
  return data.map(dataEntry => Object.assign(
    { degrees: (dataEntry.value / total) * totalAngle },
    dataEntry,
  ));
};

const degreesToRadians = degrees => ((degrees * Math.PI) / 180);

const makeSingleSegment = (startAngle = 0, endAngle = 0, key, color, lineWidth, rounded) => {
  // Let svg-partial-circle evaluate "d" value
  const pathD = partialCircle(
      VIEWBOX_HALF_SIZE, VIEWBOX_HALF_SIZE,     // center X and Y
      VIEWBOX_HALF_SIZE - (lineWidth / 2) ,     // radius
      degreesToRadians(startAngle),
      degreesToRadians(endAngle),
  )
  .map(command => command.join(' '))
  .join(' ');

  return (
    <path
      d={pathD}
      key={key}
      stroke={color}
      strokeWidth={lineWidth}
      strokeLinecap={rounded ? 'round' : undefined}
      fill="none"
    />
  );
};

const makeSegments = (data, props) => {
  let degreesAccumulator = 0;

  return data.map((dataEntry, index) => {
    const segment = makeSingleSegment(
      degreesAccumulator + props.startAngle,
      degreesAccumulator + props.startAngle + dataEntry.degrees,
      dataEntry.key || index,
      dataEntry.color,
      props.lineWidth,
      props.rounded,
    );

    // Keep track of how many degrees have already been taken
    degreesAccumulator += dataEntry.degrees;
    return segment;
  });
};

export default function CheapGoalPie({ style, ...props }) {
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
      style={style}
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
};

CheapGoalPie.defaultProps = {
  startAngle: 0,
  endAngle: 360,
  lineWidth: 100,
  rounded: 0,
};
