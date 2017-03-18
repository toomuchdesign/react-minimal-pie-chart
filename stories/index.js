import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import PieChart from '../src/index.js';

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
  .add('180° arc with custom "startAngle"/"lengthAngle"', () => (
    <PieChart
      data={dataMock}
      startAngle={-180}
      lengthAngle={180}
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
  // .add('animation on mount with "animate" and negative lengthAngle', () => (
  //   <PieChart
  //     data={dataMock}
  //     lengthAngle={-360}
  //     animate
  //   />
  // ))
  .add('as a loading bar with "reveal"', () => {
    const Wrapper = class Wrapper extends Component {
      constructor(props) {
        super(props);

        this.state = {
          percentage: 20,
        }

        this.handleRangeChange = this.handleRangeChange.bind(this);
      }

      handleRangeChange(e) {
        const newValue = e.target.value;
        this.setState(() => ({ percentage: Number(newValue) }));
      }

      render() {
        return(
          <div>
            <PieChart
              data={[
                { value: 1, key: 1, color: 'blue' },
              ]}
              reveal={this.state.percentage}
              lengthAngle={360}
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
              style={{width: '100%'}}
              onChange={this.handleRangeChange}
            />
          </div>
        );
      }
    };

    return <Wrapper />;
  })
