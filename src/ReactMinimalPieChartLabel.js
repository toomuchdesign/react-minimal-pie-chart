import React from 'react';
import PropTypes from 'prop-types';
import { dataPropType } from './propTypes';

export default function ReactMinimalPieChartLabel({
  data,
  dataIndex,
  color,
  horizontalAlignment,
  children,
  ...props
}) {
  // Align label horizontally
  let textAnchorValue;
  switch(horizontalAlignment) {
    case 'outward':
      textAnchorValue = props.dx > 0 ? 'start' : 'end';
      break;
    case 'inward':
      textAnchorValue = props.dx > 0 ? 'end' : 'start';
      break;
    default:
      textAnchorValue = 'middle';
  }

  return (

    <text
      textAnchor={textAnchorValue}
      alignmentBaseline="middle"
      className="react-minimal-pie-chart-label"
      fill={color}
      {...props}
    >
      {children(data, dataIndex, props)}
    </text>
  );
}

ReactMinimalPieChartLabel.displayName = 'ReactMinimalPieChartLabel';

ReactMinimalPieChartLabel.propTypes = {
  children: PropTypes.func.isRequired,
  color: PropTypes.string,
  data: dataPropType,
  dataIndex: PropTypes.number,
  dx: PropTypes.number.isRequired,
  horizontalAlignment: PropTypes.oneOf(['outward', 'inward']),
};
