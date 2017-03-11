import React, { PropTypes } from 'react';
import cornerArc from 'svg-arc-corners';

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

const makeSingleSegment = (startAngle = 0, endAngle = 0, key, color, lineWidth, cornerRadius) => {
  // Let svg-arc-corners evaluate "d" value
  // https://github.com/w8r/svg-arc-corners/tree/v1.0.4
  const pathD = cornerArc(
    [VIEWBOX_HALF_SIZE, VIEWBOX_HALF_SIZE],   // Center chart to the middle of viewBox
    VIEWBOX_HALF_SIZE,                        // Radius
    startAngle,
    endAngle,
    lineWidth,
    cornerRadius,
  );

  return (
    <path
      d={pathD}
      key={key}
      fill={color}
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
      props.cornerRadius,
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
      style={Object.assign({ height: `${props.size}px` }, style)}
      {...props}
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
      value: PropTypes.number,
      key: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      color: PropTypes.string,
    }),
  ),
  totalValue: PropTypes.number,
  style: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  lineWidth: PropTypes.number,
  cornerRadius: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
};

CheapGoalPie.defaultProps = {
  size: '100%',
  startAngle: 0,
  endAngle: 360,
  lineWidth: 100,
  cornerRadius: 0,
};
