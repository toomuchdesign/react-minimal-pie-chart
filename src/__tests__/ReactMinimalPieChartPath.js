import React from 'react';
import { shallow } from 'enzyme';

import PieChartPath from '../ReactMinimalPieChartPath';

describe('ReactMinimalPieChartPath component', () => {
  it('Should return a "path" element with defined "d" prop', () => {
    const wrapper = shallow(
      <PieChartPath
        cx={100}
        cy={100}
      />
    );

    expect(wrapper.type()).toBe('path');
    expect(typeof wrapper.prop('d')).toBe('string');
  });
});
