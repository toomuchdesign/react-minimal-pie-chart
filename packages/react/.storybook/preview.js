import React from 'react';
import { addDecorator } from '@storybook/react';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    brandTitle: 'React minimal pie chart',
    brandUrl: 'https://github.com/toomuchdesign/react-minimal-pie-chart',
  },
  showPanel: false,
  panelPosition: 'right',
});

addDecorator((story) => (
  <div
    style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '50px',
    }}
  >
    {story()}
    <p
      style={{
        color: '#333',
        fontSize: '13px',
        textAlign: 'center',
        fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
      }}
    >
      Read the source of this demo{' '}
      <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/index.tsx">
        here
      </a>
      .
    </p>
  </div>
));
