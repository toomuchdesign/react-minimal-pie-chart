import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../src';
import { dataMock } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Partial Chart',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Chart180: Story = {
  name: '180° chart',
  args: {
    data: dataMock,
    startAngle: 180,
    lengthAngle: 180,
    viewBoxSize: [100, 50],
  },
};

export const Chart90: Story = {
  name: '90° chart',
  args: {
    data: dataMock,
    center: [100, 100],
    startAngle: -180,
    lengthAngle: 90,
    radius: 100,
  },
};

export const MissingSlice: Story = {
  args: {
    data: dataMock,
    totalValue: 60,
  },
};

export const MissingSliceWithBackground: Story = {
  args: {
    data: dataMock,
    totalValue: 60,
    background: '#bfbfbf',
  },
};
