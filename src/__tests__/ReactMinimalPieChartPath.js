import React from 'react';
import { shallow } from 'enzyme';

import PieChartPath from '../ReactMinimalPieChartPath';

describe('ReactMinimalPieChartPath component', () => {
  it('Should return a "path" element with defined "d" prop', () => {
    const wrapper = shallow(<PieChartPath cx={100} cy={100} />);

    expect(wrapper.type()).toBe('path');
    expect(typeof wrapper.prop('d')).toBe('string');
  });

  it('Should render a path with "strokeWidth" = 5', () => {
    const wrapper = shallow(<PieChartPath cx={100} cy={100} lineWidth={5} />);

    expect(wrapper.prop('strokeWidth')).toBe(5);
  });

  it('Should render a fully revealed path with "strokeDashoffset" === 2 x "strokeDasharray"', () => {
    const wrapper = shallow(
      <PieChartPath cx={100} cy={100} lengthAngle={360} reveal={100} />
    );

    expect(wrapper.prop('strokeDashoffset')).toBe(
      wrapper.prop('strokeDasharray') * 2
    );
  });

  it('Should render a fully hidden path with "strokeDashoffset" === "strokeDasharray"', () => {
    const wrapper = shallow(
      <PieChartPath cx={100} cy={100} lengthAngle={360} reveal={0} />
    );

    expect(wrapper.prop('strokeDashoffset') > 0).toBe(true);
    expect(wrapper.prop('strokeDashoffset')).toEqual(
      wrapper.prop('strokeDasharray')
    );
  });

  it('Should render a partially hidden path (1/4) with "strokeDashoffset"/"strokeDasharray"', () => {
    const wrapper = shallow(
      <PieChartPath cx={100} cy={100} lengthAngle={360} reveal={25} />
    );

    const strokeDashoffset = wrapper.prop('strokeDashoffset');
    const strokeDasharray = wrapper.prop('strokeDasharray');
    expect(strokeDashoffset).toEqual(strokeDasharray + strokeDasharray / 4);
  });
});
