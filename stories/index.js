import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import PieChart from '../index.js';

const dataMock = [
  { value: 10, key: 1, color: 'blue' },
  { value: 15, key: 2, color: 'orange' },
  { value: 20, key: 3, color: 'green' },
];

storiesOf('React easy pie chart', module)
  .add('default', () => (
    <PieChart
      data={dataMock}
    />
  ))
  .add('180° arc', () => (
    <PieChart
      data={dataMock}
      startAngle={-90}
      endAngle={90}
    />
  ))
  .add('arc chart', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
    />
  ))
  .add('arc chart + rounded corners', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
      rounded
    />
  ))
  .add('custom size', () => (
    <PieChart
      data={dataMock}
      size={200}
    />
  ))
  .add('with totalValue', () => (
    <PieChart
      data={dataMock}
      totalValue={90}
    />
  ))
