import React from 'react';
import { addDecorator, addParameters, configure } from '@storybook/react';
import {
  setDefaults as setInfoDefaults,
  withInfo,
} from '@storybook/addon-info';

function ContainDecorator(story) {
  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '50px',
      }}
    >
      {story()}
    </div>
  );
}

setInfoDefaults({
  header: false,
  inline: false,
  propTables: false,
  maxPropsIntoLine: 1,
  inline: true,
});

addParameters({
  options: {
    name: 'React minimal pie chart',
    url: 'https://github.com/toomuchdesign/react-minimal-pie-chart',
    showPanel: false,
    panelPosition: 'right',
  },
});
addDecorator((story, context) => withInfo()(story)(context));
addDecorator(story => (
  <div>
    {story()}
    <p>
      Find the original source of the examples{' '}
      <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/index.js">
        here.
      </a>
    </p>
  </div>
));
addDecorator(ContainDecorator);

configure(() => require('../stories/index.js'), module);
