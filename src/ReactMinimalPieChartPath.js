import React, { PropTypes } from 'react';
import partialCircle from './partialCircle';

const PI = Math.PI;
const degreesToRadians = degrees => ((degrees * PI) / 180);

const makePathCommands = (cx, cy, startAngle, lengthAngle, radius, paddingAngle) => {
  // Let svg-partial-circle evaluate "d" value
  // Patch: calculating a 360° ring produces a broken path
  const patchedLengthAngle = lengthAngle === 360
    ? 359.999
    : lengthAngle;

  return partialCircle(
      cx, cy,                                   // center X and Y
      radius,                                   // radius
      degreesToRadians(startAngle),
      degreesToRadians(startAngle + patchedLengthAngle - paddingAngle),
  )
  .map(command => command.join(' '))
  .join(' ');
};

export default function ReactMinimalPieChartPath (
  {cx, cy, startAngle, lengthAngle, radius, paddingAngle, lineWidth, reveal, ...props}
) {
  const actualRadio = radius - (lineWidth / 2);
  const pathCommands = makePathCommands(
    cx, cy,
    startAngle,
    lengthAngle,
    actualRadio,
    paddingAngle,
  );
  let strokeDasharray;
  let strokeDashoffset;

  // Animate/hide paths with "stroke-dasharray" + "stroke-dashoffset"
  // https://css-tricks.com/svg-line-animation-works/
  if (typeof reveal === 'number') {
    strokeDasharray = ((PI * actualRadio) / 180) * Math.abs(lengthAngle);
    strokeDashoffset = strokeDasharray + (strokeDasharray / 100) * reveal;
  }

  return (
    <path
      d={pathCommands}
      strokeWidth={lineWidth}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      {...props}
    />
  );
}

ReactMinimalPieChartPath.displayName = 'ReactMinimalPieChartPath';

ReactMinimalPieChartPath.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  startAngle: PropTypes.number,
  lengthAngle: PropTypes.number,
  radius: PropTypes.number,
  lineWidth: PropTypes.number,
  paddingAngle: PropTypes.number,
  reveal: PropTypes.number,
};

ReactMinimalPieChartPath.defaultProps = {
  startAngle: 0,
  lengthAngle: 0,
  lineWidth: 100,
  paddingAngle: 0,
  radius: 100,
};
