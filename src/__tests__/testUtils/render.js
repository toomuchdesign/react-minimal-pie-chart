import React from 'react';
import { render as TLRender, act } from '@testing-library/react';
import { PieChart } from '../../../src';

export const dataMock = [
  { value: 10, color: 'blue' },
  { value: 15, color: 'orange' },
  { value: 20, color: 'green' },
];

export function render(props) {
  const defaultProps = { data: dataMock };
  const instance = TLRender(<PieChart {...defaultProps} {...props} />);

  // Uniform rerender to render's API
  const { rerender } = instance;
  instance.rerender = (props) =>
    rerender(<PieChart {...defaultProps} {...props} />);
  return instance;
}

export { PieChart, act };
