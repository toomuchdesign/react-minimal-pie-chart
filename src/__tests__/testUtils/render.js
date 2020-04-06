// @ts-nocheck
import React from 'react';
import { render as TLRender } from '@testing-library/react';
import PieChart from '../../../src/index';

export const dataMock = [
  { value: 10, color: 'blue' },
  { value: 15, color: 'orange' },
  { value: 20, color: 'green' },
];

export const expectedNormalizedDataMock = {
  x: expect.any(Number),
  y: expect.any(Number),
  dx: expect.any(Number),
  dy: expect.any(Number),
  textAnchor: expect.any(String),
  data: dataMock.map((entry) => ({
    ...entry,
    degrees: expect.any(Number),
    startOffset: expect.any(Number),
    percentage: expect.any(Number),
  })),
  dataIndex: expect.any(Number),
  color: expect.any(String),
};

export function render(props) {
  const defaultProps = { data: dataMock };
  return TLRender(<PieChart {...defaultProps} {...props} />);
}

export { PieChart };
