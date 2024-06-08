import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../src';
import { dataMock } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Animation',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const OnMountClockwise: Story = {
  args: {
    data: dataMock,
    animate: true,
  },
};

export const OnMountCounterclockwise: Story = {
  args: {
    data: dataMock,
    animate: true,
    lengthAngle: -360,
  },
};
