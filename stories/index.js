import React from 'react';
import { storiesOf } from '@storybook/react';
import PieChart from '../src/index.js';
import InteractionStory from './InteractionStory';
import GradientStory from './GradientStory';
import LoadingIndicatorStory from './LoadingIndicatorStory';
import PartialLoadingIndicatorStory from './PartialLoadingIndicatorStory';

const dataMock = [
  { title: 'One', value: 10, color: '#E38627' },
  { title: 'Two', value: 15, color: '#C13C37' },
  { title: 'Three', value: 20, color: '#6A2135' },
];

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
  fill: '#121212',
};

storiesOf('Pie Chart', module)
  .add('Default', () => <PieChart data={dataMock} />)
  .add('Custom size', () => (
    <PieChart data={dataMock} style={{ height: '100px' }} />
  ));

storiesOf('Donut Chart', module)
  .add("Custom arcs' width", () => <PieChart data={dataMock} lineWidth={15} />)
  .add('Rounded arcs', () => (
    <PieChart data={dataMock} lineWidth={15} rounded />
  ))
  .add('Padded arcs', () => (
    <PieChart data={dataMock} lineWidth={15} paddingAngle={5} />
  ));

storiesOf('Loading indicator', module)
  .add('360° indicator', () => <LoadingIndicatorStory />)
  .add('270° indicator with background', () => (
    <PartialLoadingIndicatorStory />
  ));

storiesOf('Partial chart', module)
  .add('180° chart', () => (
    <PieChart
      data={dataMock}
      startAngle={180}
      lengthAngle={180}
      viewBoxSize={[100, 50]}
    />
  ))
  .add('90° chart', () => (
    <PieChart
      data={dataMock}
      cx={100}
      cy={100}
      startAngle={-180}
      lengthAngle={90}
      radius={100}
    />
  ))
  .add('Missing slice', () => <PieChart data={dataMock} totalValue={60} />)
  .add('Missing slice with background', () => (
    <PieChart data={dataMock} totalValue={60} background="#bfbfbf" />
  ));

storiesOf('Labels', module)
  .add('Default labels', () => (
    <PieChart
      data={dataMock}
      label
      labelStyle={{
        ...defaultLabelStyle,
      }}
    />
  ))
  .add('Outer labels', () => (
    <PieChart
      data={dataMock}
      label
      labelStyle={{
        fontSize: '5px',
        fontFamily: 'sans-serif',
      }}
      radius={42}
      labelPosition={112}
    />
  ))
  .add('Inner labels', () => (
    <PieChart
      data={dataMock}
      lineWidth={20}
      paddingAngle={18}
      rounded
      label
      labelStyle={{
        fontSize: '5px',
        fontFamily: 'sans-serif',
      }}
      labelPosition={60}
    />
  ))
  .add('Single label', () => (
    <PieChart
      data={[{ value: 82, color: '#E38627' }]}
      totalValue={100}
      lineWidth={20}
      label
      labelStyle={{
        fontSize: '25px',
        fontFamily: 'sans-serif',
      }}
      labelPosition={0}
    />
  ))
  .add('Percentage', () => (
    <PieChart
      data={dataMock}
      label={({ data, dataIndex }) =>
        Math.round(data[dataIndex].percentage) + '%'
      }
      labelStyle={defaultLabelStyle}
    />
  ));

storiesOf('Animation', module)
  .add('On mount clockwise', () => <PieChart data={dataMock} animate />)
  .add('On mount counterclockwise', () => (
    <PieChart data={dataMock} lengthAngle={-360} animate />
  ));

storiesOf('Interaction', module)
  .addParameters({ options: { showPanel: true, panelPosition: 'bottom' } })
  .add('click, mouseOver, mouseOut callbacks', () => (
    <InteractionStory data={dataMock} />
  ));

storiesOf('Misc', module)
  .add('Gradients with custom <defs>', () => <GradientStory />)
  .add('Squared pie', () => (
    <PieChart
      data={dataMock}
      label
      labelStyle={defaultLabelStyle}
      radius={75}
    />
  ));
