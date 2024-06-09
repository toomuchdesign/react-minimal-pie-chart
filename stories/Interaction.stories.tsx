import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../src';
import Interaction from './components/Interaction';
import InteractionTab from './components/InteractionTab';
import { dataMock } from './mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PieChart> = {
  title: 'Example/Interaction',
  component: PieChart,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ClickMouseoverMouseoutCallbacks: Story = {
  name: 'click, mouseOver, mouseOut callbacks',
  args: {
    data: dataMock,
    animate: true,
  },
  parameters: {
    controls: { expanded: true, open: true },
  },
  render: (props) => <Interaction {...props} />,
};

export const TabEnterKeyPress: Story = {
  name: 'Tab + Enter key press',
  args: {
    data: dataMock,
    animate: true,
    lengthAngle: -360,
  },
  parameters: {
    controls: { expanded: true, open: true },
  },
  render: (props) => <InteractionTab {...props} />,
};
