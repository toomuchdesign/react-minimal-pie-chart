import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../src';
import Tooltip from './components/Tooltip';
import { dataMock, defaultLabelStyle } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Misc',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SingleGradient: Story = {
  args: {
    data: [{ value: 10, color: 'url(#gradient1)' }],
    startAngle: -180,
    lengthAngle: 180,
    lineWidth: 20,
    viewBoxSize: [100, 50],
    children: [
      <defs>
        <linearGradient id="gradient1">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="45%" stopColor="#ffb961" />
          <stop offset="55%" stopColor="#ffb961" />
          <stop offset="100%" stopColor="#C13C37" />
        </linearGradient>
      </defs>,
    ],
  },
};

export const SquaredPie: Story = {
  args: {
    data: dataMock,
    label: ({ dataEntry }) => dataEntry.value,
    labelStyle: defaultLabelStyle,
    radius: 75,
  },
};

export const TooltipIntegration: Story = {
  args: {
    data: dataMock,
    animate: true,
    lengthAngle: -360,
  },
  render: (props) => <Tooltip {...props} />,
};
