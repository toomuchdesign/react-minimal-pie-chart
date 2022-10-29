import React from 'react';
import {
  render as TLRender,
  act,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
// @NOTE this import must finish with "/src" to allow test runner
// to remap it against bundled artefacts (npm run test:bundles:unit)
import { PieChart, PieChartProps } from '../..';

const dataMock = [
  { value: 10, color: 'blue' },
  { value: 15, color: 'orange' },
  { value: 20, color: 'green' },
];

function render(
  props?: Partial<PieChartProps>
): RenderResult & { reRender: (props?: Partial<PieChartProps>) => void } {
  const defaultProps = { data: dataMock };
  const instance = TLRender(<PieChart {...defaultProps} {...props} />);

  // Uniform rerender to render's API
  return {
    ...instance,
    reRender: (props?: Partial<PieChartProps>) =>
      instance.rerender(<PieChart {...defaultProps} {...props} />),
  };
}

export { PieChart, act, dataMock, render, fireEvent };
