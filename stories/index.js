/* global module */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import PieChart from '../src/index.js';
import InteractionStory from './InteractionStory';
import GradientStory from './GradientStory';
import LoadingIndicatorStory from './LoadingIndicatorStory';

const ContainDecorator = story => (
  <div
    key={Date.now()}
    style={{
      maxWidth: '400px',
      margin: '0 auto',
    }}
  >
    {story()}
  </div>
);

const dataMock = [
  { title: 'One', value: 10, color: '#E38627' },
  { title: 'Two', value: 15, color: '#C13C37' },
  { title: 'Three', value: 20, color: '#6A2135' },
];

storiesOf('React minimal pie chart', module)
  .addDecorator(ContainDecorator)
  .add('default', () => <PieChart data={dataMock} />)
  .add('custom size with "style"', () => (
    <PieChart
      data={dataMock}
      style={{ height: '100px' }}
    />
  ))
  .add('gradients with "injectSvg":', () => <GradientStory />);

storiesOf('Donut Chart', module)
  .addDecorator(ContainDecorator)
  .add('custom "lineWidth"', () => <PieChart
    data={dataMock}
    lineWidth={15}
  />)
  .add('custom "lineWidth" + "rounded"', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
      rounded
    />
  ))
  .add('custom "lineWidth" + "paddingAngle"', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
      paddingAngle={5}
    />
  ))
  .add('custom "lineWidth" + "paddingAngle" + negative "lengthAngle"', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
      paddingAngle={5}
      lengthAngle={-360}
    />
  ));

storiesOf('Loading indicator', module)
  .addDecorator(ContainDecorator)
  .add('with "reveal"', () => <LoadingIndicatorStory />);

storiesOf('Partial chart', module)
  .addDecorator(ContainDecorator)
  .add('180° chart with custom "startAngle"/"lengthAngle"', () => (
    <PieChart
      data={dataMock}
      startAngle={180}
      lengthAngle={180}
    />
  ))
  .add('180° chart with custom negative "lengthAngle" and svg ratio', () => (
    <PieChart
      data={dataMock}
      lengthAngle={-180}
      ratio={2}
    />
  ))
  .add('90° chart with custom center + "radius"', () => (
    <PieChart
      data={dataMock}
      cx={100}
      cy={100}
      startAngle={-180}
      lengthAngle={90}
      radius={100}
    />
  ))
  .add('uncomplete chart with custom "totalValue"', () => (
    <PieChart
      data={dataMock}
      totalValue={60}
    />
  ));

storiesOf('Labels', module)
  .addDecorator(ContainDecorator)
  .add('default labels', () => (
    <PieChart
      data={dataMock}
      label
      labelStyle={{
        fontSize: '5px',
        fontFamily: 'sans-serif',
      }}
    />
  ))
  .add('outer labels', () => (
    <PieChart
      data={dataMock}
      label
      labelStyle={{
        fontSize: '5px',
        fontFamily: 'sans-serif',
      }}
      labelRadius={70}
    />
  ))
  .add('show percentage', () => (
    <PieChart
      data={dataMock}
      label={({ data, dataIndex }) =>
        Math.round(data[dataIndex].percentage) + '%'
      }
      labelStyle={{
        fontSize: '5px',
        fontFamily: 'sans-serif',
      }}
    />
  ));

storiesOf('Animation', module)
  .addDecorator(ContainDecorator)
  .add('on mount with "animate"', () => <PieChart
    data={dataMock}
    animate
  />)
  .add('clockwise animation with negative "lengthAngle"', () => (
    <PieChart
      data={dataMock}
      lengthAngle={-360}
      animate
    />
  ));

storiesOf('Interaction', module)
  .addDecorator(ContainDecorator)
  .add('custom click/mouseOver/mouseOut callbacks', () => (
    <InteractionStory data={dataMock} />
  ));
