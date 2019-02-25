import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { setOptions as setAddonOptions } from '@storybook/addon-options';
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

setAddonOptions({
  name: 'React minimal pie chart',
  url: 'https://toomuchdesign.github.io/react-minimal-pie-chart/index.html',
});

setInfoDefaults({
  header: false,
  inline: false,
  propTables: false,
  maxPropsIntoLine: 1,
  inline: true,
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
