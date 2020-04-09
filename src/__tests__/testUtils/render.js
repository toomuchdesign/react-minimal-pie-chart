// @ts-nocheck
import React from 'react';
import { render as TLRender } from '@testing-library/react';
import PieChart from '../../../src/index';

export const dataMock = [
  { value: 10, color: 'blue' },
  { value: 15, color: 'orange' },
  { value: 20, color: 'green' },
];

export function render(props) {
  const defaultProps = { data: dataMock };
  return TLRender(<PieChart {...defaultProps} {...props} />);
}

export { PieChart };
