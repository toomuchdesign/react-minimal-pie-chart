import React from 'react';
import PropTypes from 'prop-types';
import { dataPropType } from './propTypes';

export default function ReactMinimalPieChartLabel({
  data, // eslint-disable-line no-unused-vars
  dataIndex, // eslint-disable-line no-unused-vars
  color,
  ...props
}) {
  return (
    <text
      textAnchor="middle"
      alignmentBaseline="middle"
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
