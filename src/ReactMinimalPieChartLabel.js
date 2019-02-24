import React from 'react';
import PropTypes from 'prop-types';
import { dataPropType } from './propTypes';

export default function ReactMinimalPieChartLabel({
  data,
  dataIndex,
  color,
  children,
  ...props
}) {
  return (
    <text
      textAnchor="middle"
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
  data: dataPropType,
  dataIndex: PropTypes.number,
  children: PropTypes.func.isRequired,
  color: PropTypes.string,
};
