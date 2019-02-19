import React from 'react';
import PropTypes from 'prop-types';

export default function ReactMinimalPieChartLabel({
  data,
  dataIndex,
  children,
  ...props
}) {
  return (
    <text
      textAnchor="middle"
      alignmentBaseline="middle"
      className="react-minimal-pie-chart-label"
      {...props}
    >
      {children(data, dataIndex, props)}
    </text>
  );
}

ReactMinimalPieChartLabel.displayName = 'ReactMinimalPieChartLabel';

ReactMinimalPieChartLabel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      value: PropTypes.number.isRequired,
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      color: PropTypes.string,
    })
  ),
  dataIndex: PropTypes.number,
  children: PropTypes.func.isRequired,
};
