import React from 'react';
import PropTypes from 'prop-types';
import { dataPropType } from './propTypes';

export default function ReactMinimalPieChartLabel({
  data,
  dataIndex,
  color,
  ...props
}) {
  return (
    <text
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color}
      {...props}
    />
  );
}

ReactMinimalPieChartLabel.displayName = 'ReactMinimalPieChartLabel';

ReactMinimalPieChartLabel.propTypes = {
  data: dataPropType,
  dataIndex: PropTypes.number,
  color: PropTypes.string,
};
