import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import PieChart from '../index.js';

const ContainDecorator = (story) => (
  <div
    style={{
      maxWidth: '400px',
      margin: '0 auto',
    }}
  >
    {story()}
  </div>
);

const dataMock = [
  { value: 10, key: 1, color: 'blue' },
  { value: 15, key: 2, color: 'orange' },
  { value: 20, key: 3, color: 'green' },
];

storiesOf('React minimal pie chart', module)
  .addDecorator(ContainDecorator)
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
      style={{ height: '100px' }}
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
  .add('hide a part of the pie with hidden={25}', () => (
    <PieChart
      data={[
        { value: 10, key: 1, color: 'blue' },
      ]}
      hidden={25}
      startAngle={-180}
      endAngle={180}
    />
  ))
  .add('animate chart on mount', () => (
    <PieChart
      data={dataMock}
      animate
    />
  ))
