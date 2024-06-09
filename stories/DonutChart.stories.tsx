import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../src';
import { dataMock } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Donut Chart',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CustomArcsWidth: Story = {
  args: {
    data: dataMock,
    lineWidth: 15,
  },
};

export const RoundedArcs: Story = {
  args: {
    data: dataMock,
    lineWidth: 15,
    rounded: true,
  },
};

export const PaddedArcs: Story = {
  args: {
    data: dataMock,
    lineWidth: 15,
    paddingAngle: 5,
  },
};
