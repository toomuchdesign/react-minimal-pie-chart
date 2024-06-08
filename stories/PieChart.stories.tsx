import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PieChart, pieChartDefaultProps } from '../src';
import FullOption from './components/FullOption';
import { dataMock, defaultLabelStyle } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Pie Chart',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FullOptions: Story = {
  args: {
    data: dataMock,
  },
  render: (props) => <FullOption {...props} />,
};

export const Default: Story = {
  args: {
    data: dataMock,
  },
};

export const CustomSize: Story = {
  args: {
    data: dataMock,
    style: { height: '100px' },
  },
};

const shiftSize = 7;
export const Exploded: Story = {
  args: {
    data: dataMock,
    radius: pieChartDefaultProps.radius - shiftSize,
    segmentsShift: (index) => (index === 0 ? shiftSize : 0.5),
    label: ({ dataEntry }) => dataEntry.value,
    labelStyle: {
      ...defaultLabelStyle,
    },
  },
};
