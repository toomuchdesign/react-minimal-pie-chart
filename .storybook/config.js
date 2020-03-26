import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addParameters({
  options: {
    theme: {
      brandTitle: 'React minimal pie chart',
      brandUrl: 'https://github.com/toomuchdesign/react-minimal-pie-chart',
    },
    showPanel: false,
    panelPosition: 'right',
  },
});

addDecorator(
  withInfo({
    header: false,
    inline: false,
    propTables: false,
    maxPropsIntoLine: 1,
    inline: true,
  })
);
addDecorator(story => (
  <div>
    {story()}
    <p
      style={{
        color: '#333',
        fontSize: '13px',
        textAlign: 'center',
        fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
      }}
    >
      Find the original source of the examples{' '}
      <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/index.js">
        here.
      </a>
    </p>
  </div>
));
addDecorator(story => (
  <div
    style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '50px',
    }}
  >
    {story()}
  </div>
));
