import React from 'react';
import PieChart from '../src/index.js';

const dataMock = [
  { value: 10, color: 'url(#gradient1)' },
  { value: 20, color: 'url(#gradient2)' },
];

function GradientStory() {
  return (
    <PieChart
      data={dataMock}
      injectSvg={() => (
        <defs>
          <linearGradient id="gradient1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E38627" />
            <stop offset="50%" stopColor="#ffb961" />
            <stop offset="100%" stopColor="#E38627" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C13C37" />
            <stop offset="50%" stopColor="#e35f56" />
            <stop offset="100%" stopColor="#C13C37" />
          </linearGradient>
        </defs>
      )}
    />
  );
}

export default GradientStory;
