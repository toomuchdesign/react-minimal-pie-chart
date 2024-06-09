import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../src';
import LoadingIndicator from './components/LoadingIndicator';
import PartialLoadingIndicator from './components/PartialLoadingIndicator';
import { dataMock } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Loading indicator',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Indicator1: Story = {
  name: '360° indicator',
  args: {
    data: dataMock,
  },
  render: (props) => <LoadingIndicator {...props} />,
};

export const Indicator2: Story = {
  name: '270° indicator with background',
  args: {
    data: dataMock,
  },
  render: (props) => <PartialLoadingIndicator {...props} />,
};
