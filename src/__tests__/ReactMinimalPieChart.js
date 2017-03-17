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

  it('Should return a Path component for each entry in props.data', () => {
    const wrapper = shallow(
      <PieChart
        data={dataMock}
      />
    );

    const pathElements = wrapper.find('ReactMinimalPieChartPath');
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

  it('Should render a set of arc paths having total lengthAngle === 270°', () => {
    const pieLengthAngle = 270;
    let pathsTotalLengthAngle = 0;

    const wrapper = shallow(
      <PieChart
        data={dataMock}
        lengthAngle={pieLengthAngle}
      />
    );

    const paths = wrapper.find('ReactMinimalPieChartPath');
    paths.forEach((path) => {
      pathsTotalLengthAngle += path.prop('lengthAngle');
    });

    expect(pieLengthAngle).toEqual(pathsTotalLengthAngle);
  });

  it('Should render a set of arc paths with negative lengthAngle === -270°', () => {
    const pieLengthAngle = -270;
    let pathsTotalLengthAngle = 0;

    const wrapper = shallow(
      <PieChart
        data={dataMock}
        lengthAngle={pieLengthAngle}
      />
    );

    const paths = wrapper.find('ReactMinimalPieChartPath');
    paths.forEach((path) => {
      pathsTotalLengthAngle += path.prop('lengthAngle');
    });

    expect(pieLengthAngle).toEqual(pathsTotalLengthAngle);
  });

  it('Should append children paths a "transition" inline style prop with custom duration/easing', () => {
    const wrapper = shallow(
      <PieChart
        data={dataMock}
        animate
        animationDuration={100}
        animationEasing="ease"
      />
    );
    const firstPath = wrapper.find('ReactMinimalPieChartPath').first();

    const expected = 'stroke-dashoffset 100ms ease';
    const actual = firstPath.prop('style').transition;
    expect(actual).toEqual(expected);
  });

  it('Should pass down to each segment the custom "reveal" prop', () => {
    const wrapper = shallow(
      <PieChart
        data={dataMock}
        reveal={22}
      />
    );

    wrapper.find('ReactMinimalPieChartPath').forEach((path) => {
      expect(path.prop('reveal')).toBe(22);
    });
  });

  it('Should perform paths CSS animation by rendering paths twice by setting "reveal" to 0 and then to 100', () => {
    const wrapper = shallow(
      <PieChart
        data={dataMock}
        animate
      />
    );
    let firstPath = wrapper.find('ReactMinimalPieChartPath').first();
    expect(firstPath.prop('reveal')).toEqual(0);

    // Manually fire .startAnimation()
    // @TODO Find a smarter approach of firing the animation
    wrapper.instance().startAnimation();

    firstPath = wrapper.find('ReactMinimalPieChartPath').first();
    expect(firstPath.prop('reveal')).toEqual(100);
  });
});
