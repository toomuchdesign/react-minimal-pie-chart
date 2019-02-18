/* global module */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src/index.js';

const ContainDecorator = story => (
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
  { value: 10, color: '#E38627' },
  { value: 15, color: '#C13C37' },
  { value: 20, color: '#6A2135' },
];

class DemoInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataMock,
    };

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOut(e, d, i) {
    this.setState({
      data: dataMock,
    });
  }

  onMouseOver(e, d, i) {
    const data = d.map((entry, index) => {
      return index === i ? { ...entry, color: 'grey' } : entry;
    });

    this.setState({
      data,
    });
  }

  render() {
    return (
      <PieChart
        data={this.state.data}
        segmentsStyle={{ transition: 'stroke .3s' }}
        onClick={action('CLICK')}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        animate
      />
    );
  }
}

storiesOf('React minimal pie chart', module)
  .addDecorator(ContainDecorator)
  .add('default', () => <PieChart data={dataMock} />)
  .add('180° arc with custom "startAngle"/"lengthAngle"', () => (
    <PieChart
      data={dataMock}
      startAngle={180}
      lengthAngle={180}
    />
  ))
  .add('180° arc with negative "lengthAngle" and custom svg ratio', () => (
    <PieChart
      data={dataMock}
      lengthAngle={-180}
      ratio={2}
    />
  ))
  .add('custom center + "radius"', () => (
    <PieChart
      data={dataMock}
      cx={100}
      cy={100}
      startAngle={-180}
      lengthAngle={90}
      radius={100}
    />
  ))
  .add('with custom "lineWidth"', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
    />
  ))
  .add('with custom "lineWidth" + "rounded"', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
      rounded
    />
  ))
  .add('with custom "lineWidth" + "paddingAngle"', () => (
    <PieChart
      data={dataMock}
      lineWidth={15}
      paddingAngle={5}
    />
  ))
  .add(
    'with custom "lineWidth" + "paddingAngle" + negative "lengthAngle"',
    () => (
      <PieChart
        data={dataMock}
        lineWidth={15}
        paddingAngle={5}
        lengthAngle={-360}
      />
    )
  )
  .add('with custom "style" height', () => (
    <PieChart
      data={dataMock}
      style={{ height: '100px' }}
    />
  ))
  .add('uncomplete chart with custom "totalValue"', () => (
    <PieChart
      data={dataMock}
      totalValue={60}
    />
  ))
  .add('animation on mount with "animate"', () => (
    <PieChart
      data={dataMock}
      animate
    />
  ))
  .add('clockwise animation on mount with negative "lengthAngle"', () => (
    <PieChart
      data={dataMock}
      lengthAngle={-360}
      animate
    />
  ))
  .add('gradients with "injectSvg":', () => {
    const dataMock = [
      { value: 10, color: 'url(#gradient1)' },
      { value: 20, color: 'url(#gradient2)' },
    ];

    return (
      <PieChart
        data={dataMock}
        injectSvg={() => (
          <defs>
            <linearGradient
              id="gradient1"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#E38627"
              />
              <stop
                offset="50%"
                stopColor="#ffb961"
              />
              <stop
                offset="100%"
                stopColor="#E38627"
              />
            </linearGradient>
            <linearGradient
              id="gradient2"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#C13C37"
              />
              <stop
                offset="50%"
                stopColor="#e35f56"
              />
              <stop
                offset="100%"
                stopColor="#C13C37"
              />
            </linearGradient>
          </defs>
        )}
      />
    );
  })
  .add('Interaction using click/mouseOver/mouseOut', () => <DemoInteraction />)
  .add('as a loading bar with "reveal"', () => {
    const Wrapper = class Wrapper extends Component {
      constructor(props) {
        super(props);

        this.state = {
          percentage: 20,
        };

        this.handleRangeChange = this.handleRangeChange.bind(this);
      }

      handleRangeChange(e) {
        const newValue = e.target.value;
        this.setState(() => ({ percentage: Number(newValue) }));
      }

      render() {
        return (
          <div>
            <PieChart
              data={[{ value: 1, key: 1, color: '#E38627' }]}
              reveal={this.state.percentage}
              lineWidth={20}
              animate
            />
            Reveal: {this.state.percentage}%
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={this.state.percentage}
              style={{ width: '100%' }}
              onChange={this.handleRangeChange}
            />
          </div>
        );
      }
    };

    return <Wrapper />;
  });
