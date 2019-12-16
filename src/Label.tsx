import React from 'react';
import PropTypes from 'prop-types';
import { dataPropType } from './propTypes';
import { ExtendedData, StyleObject } from './commonTypes';

export type Props = {
  key?: string | number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  data: ExtendedData;
  dataIndex: number;
  color: string;
  style?: StyleObject;
};

export default function ReactMinimalPieChartLabel({
  data,
  dataIndex,
  color,
  ...props
}: Props) {
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
