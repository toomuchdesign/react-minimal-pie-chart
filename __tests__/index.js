/* eslint comma-dangle: 0 */
import React from 'react';
import { shallow } from 'enzyme';

import PieChart from '../index';

const dataMock = [
  { value: 10, key: 1, color: 'blue' },
  { value: 15, key: 2, color: 'orange' },
  { value: 20, key: 3, color: 'green' },
];

const styleMock = {
  color: 'green',
}

describe('ReactMinimalPieChart component', () => {
  it('Should return null props.data is undefined', () => {
    const wrapper = shallow(
      <PieChart />
    );

    expect(wrapper.getNode()).toEqual(null);
  });

  it('Should return a path element for each entry in props.data', () => {
    const wrapper = shallow(
      <PieChart
        data={dataMock}
      />
    );

    const pathElements = wrapper.find('path');
    expect(pathElements.length).toEqual(dataMock.length);
  });

  it('Should pass down className and style props to the wrapping div', () => {
    const wrapper = shallow(
      <PieChart
        data={dataMock}
        className="foo"
        style={styleMock}
      />
    );

    expect(wrapper.prop('className')).toBe('foo');
    expect(wrapper.prop('style')).toEqual(styleMock);
  });
});
