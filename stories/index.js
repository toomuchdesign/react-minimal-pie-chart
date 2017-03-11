import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import PieChart from '../index.js';

storiesOf('React easy pie chart', module)
  .add('with 3 segments', () => (
    <PieChart
      data={[
        { value: 10, key: 1, color: 'blue' },
        { value: 15, key: 2, color: 'orange' },
        { value: 20, key: 3, color: 'green' },
      ]}
    />
  ));
