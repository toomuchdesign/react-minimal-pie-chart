import PieChart, { PieChartData, LabelProps } from '../index';
import * as React from 'react';

const dataMock = [
  {
    title: 'foo',
    color: '#121212',
    value: 5,
  },
  {
    title: 'bar',
    color: '#232323',
    value: 5,
  },
];

function eventHandlerMock(
  event: React.MouseEvent,
  data: PieChartData[],
  dataIndex: number
) {}

function testPieChart() {
  new PieChart({
    data: dataMock,
  });

  new PieChart({
    data: [
      {
        value: 10,
        color: 'red',
      },
    ],
  });

  new PieChart({
    data: [
      {
        title: 'foo',
        color: '#121212',
        value: 5,
        extraProperty: 'foo',
        style: {
          stroke: 'red',
        },
      },
    ],
  });

  // typings:expect-error
  new PieChart({});

  // typings:expect-error
  new PieChart({
    data: [
      {
        title: 'foo',
        value: 5,
      },
    ],
  });

  // Label
  new PieChart({
    data: dataMock,
    label: true,
  });

  new PieChart({
    data: dataMock,
    label: (labelProps: LabelProps) => 'x',
  });

  new PieChart({
    data: dataMock,
    label: (labelProps: LabelProps) => 2,
  });

  new PieChart({
    data: dataMock,
    label: (labelProps: LabelProps) => React.createElement('div'),
  });

  new PieChart({
    data: dataMock,
    label: React.createElement('div'),
  });

  // All props
  new PieChart({
    className: 'foo',
    style: { color: 'red' },
    data: dataMock,
    cx: 10,
    cy: 10,
    viewBoxSize: [10, 10],
    startAngle: 90,
    lengthAngle: 200,
    totalValue: 30,
    radius: 3,
    lineWidth: 10,
    paddingAngle: 10,
    rounded: true,
    segmentsStyle: { color: 'red' },
    background: '#121212',
    animate: false,
    animationDuration: 10,
    animationEasing: 'some-easing',
    reveal: 50,
    injectSvg: () => React.createElement('div'),
    label: true,
    labelPosition: 10,
    labelStyle: { color: 'red' },
    onClick: eventHandlerMock,
    onMouseOver: eventHandlerMock,
    onMouseOut: eventHandlerMock,
  });
}
