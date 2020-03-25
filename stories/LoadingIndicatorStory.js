import React, { Component } from 'react';
import PieChart from '../src';

class LoadingIndicatorStory extends Component {
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
}

export default LoadingIndicatorStory;
