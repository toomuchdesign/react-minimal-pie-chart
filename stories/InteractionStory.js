import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src/index.js';
import { dataPropType } from '../src/propTypes';

const FULL_WIDTH = 35;
const NORMAL_WIDTH = 32;

class DemoInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types
      data: props.data.map(entry => ({
        ...entry,
        ...{ style: { strokeWidth: NORMAL_WIDTH } },
      })),
      selected: undefined,
    };

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // eslint-disable-next-line no-unused-vars
  onMouseOut(event, propsData, index) {
    const data = propsData.map((entry, i) => {
      return i === index
        ? {
            ...entry,
            color: this.props.data[index].color,
          }
        : entry;
    });

    this.setState({
      data,
    });
  }

  onMouseOver(event, propsData, index) {
    const data = propsData.map((entry, i) => {
      return i === index
        ? {
            ...entry,
            color: 'grey',
          }
        : entry;
    });

    this.setState({
      data,
    });
  }

  onClick(event, propsData, index) {
    action('CLICK');
    const data = propsData.map((entry, i) => {
      return {
        ...entry,
        ...{
          style: {
            ...entry.style,
            strokeWidth: i === index ? FULL_WIDTH : NORMAL_WIDTH,
          },
        },
      };
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
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        animate
      />
    );
  }
}

DemoInteraction.propTypes = {
  data: dataPropType,
};

export default DemoInteraction;
