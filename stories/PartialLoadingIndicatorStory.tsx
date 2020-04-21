import React, { useState } from 'react';
import { PieChart } from '../src';

function PartialLoadingIndicatorStory() {
  const [percentage, setPercentage] = useState(20);
  return (
    <div>
      <PieChart
        data={[{ value: 1, key: 1, color: '#E38627' }]}
        reveal={percentage}
        lineWidth={20}
        background="#bfbfbf"
        lengthAngle={270}
        rounded
        animate
      />
      Reveal: {percentage}%
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={percentage}
        style={{ width: '100%' }}
        onChange={(e) => {
          setPercentage(Number(e.target.value));
        }}
      />
    </div>
  );
}

export default PartialLoadingIndicatorStory;
