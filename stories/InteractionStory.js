import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src/index.js';
import { dataPropType } from '../src/propTypes';

class DemoInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types
      data: props.data,
    };

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // eslint-disable-next-line no-unused-vars
  onMouseOut(e, d, i) {
    this.setState({
      data: this.props.data,
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

DemoInteraction.propTypes = {
  data: dataPropType,
};

export default DemoInteraction;
