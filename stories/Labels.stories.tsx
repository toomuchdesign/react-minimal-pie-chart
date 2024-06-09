import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../src';
import { dataMock, defaultLabelStyle } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Labels',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultLabels: Story = {
  args: {
    data: dataMock,
    label: ({ dataEntry }) => dataEntry.value,
    labelStyle: {
      ...defaultLabelStyle,
    },
  },
};

export const OuterLabels: Story = {
  args: {
    data: dataMock,
    label: ({ dataEntry }) => dataEntry.value,
    labelStyle: (index) => ({
      fill: dataMock[index].color,
      fontSize: '5px',
      fontFamily: 'sans-serif',
    }),
    radius: 42,
    labelPosition: 112,
  },
};

export const InnerLabels: Story = {
  args: {
    data: dataMock,
    lineWidth: 20,
    paddingAngle: 18,
    rounded: true,
    label: ({ dataEntry }) => dataEntry.value,
    labelStyle: (index) => ({
      fill: dataMock[index].color,
      fontSize: '5px',
      fontFamily: 'sans-serif',
    }),
    labelPosition: 60,
  },
};

export const SingleLabel: Story = {
  args: {
    data: [{ value: 82, color: '#E38627' }],
    totalValue: 100,
    lineWidth: 20,
    label: ({ dataEntry }) => dataEntry.value,
    labelStyle: {
      fontSize: '25px',
      fontFamily: 'sans-serif',
      fill: '#E38627',
    },
    labelPosition: 0,
  },
};

export const Percentage: Story = {
  args: {
    data: dataMock,
    label: ({ dataEntry }) => Math.round(dataEntry.percentage) + '%',
    labelStyle: defaultLabelStyle,
  },
};

export const CustomLabelElement: Story = {
  args: {
    data: dataMock,
    label: ({ x, y, dx, dy, dataEntry }) => (
      <text
        x={x}
        y={y}
        dx={dx}
        dy={dy}
        dominant-baseline="central"
        text-anchor="middle"
        color="orange"
        style={{
          fontSize: '10px',
          fontFamily: 'sans-serif',
          filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
        }}
        fill="white"
      >
        {Math.round(dataEntry.percentage) + '%'}
      </text>
    ),
    labelStyle: defaultLabelStyle,
  },
};
