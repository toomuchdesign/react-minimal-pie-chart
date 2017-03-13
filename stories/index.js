import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import PieChart from '../index.js';

const dataMock = [
  { value: 10, key: 1, color: 'blue' },
  { value: 15, key: 2, color: 'orange' },
  { value: 20, key: 3, color: 'green' },
];

storiesOf('React minimal pie chart', module)
  .add('default', () => (
    <PieChart
      data={dataMock}
    />
  ))
  .add('180° arc', () => (
    <PieChart
      data={dataMock}
      startAngle={-180}
      endAngle={0}
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
  .add('with paddingAngle', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
      paddingAngle={5}
    />
  ))
  .add('custom size with style prop', () => (
    <PieChart
      data={dataMock}
      style={{ height: '200px' }}
    />
  ))
  .add('uncomplete chart with totalValue', () => (
    <PieChart
      data={dataMock}
      totalValue={60}
      startAngle={-180}
      endAngle={0}
    />
  ))
  .add('hide a half of the pie with hidden={50}', () => (
    <PieChart
      data={[
        { value: 10, key: 1, color: 'blue' },
      ]}
      hidden={50}
      startAngle={-180}
      endAngle={180}
    />
  ))
