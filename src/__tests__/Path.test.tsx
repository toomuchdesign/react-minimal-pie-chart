// @ts-nocheck
import { fireEvent } from '@testing-library/react';
import { render, dataMock } from './testUtils';
import { degreesToRadians } from '../utils';

describe('Path', () => {
  it('render one path for each entry in props.data', () => {
    const { container } = render();
    const paths = container.querySelectorAll('path');
    expect(paths.length).toEqual(dataMock.length);
    paths.forEach((path) => {
      expect(path).toHaveAttribute('d', expect.any(String));
    });
  });

  it('get empty "d" attributes when data values sum equals 0', () => {
    const { container } = render({
      data: [{ value: 0 }, { value: 0 }],
    });
    const paths = container.querySelectorAll('path');
    expect(paths.length).toEqual(2);
    paths.forEach((path) => {
      expect(path).toHaveAttribute('d', '');
    });
  });

  it('receive "segmentsStyle", "segmentsTabIndex", "rounded", "data[].color" and "data[].style" props', () => {
    const dataMockWithStyle = dataMock.map((entry) => ({
      ...entry,
      ...{
        color: 'black',
        style: { fill: 'green' },
      },
    }));
    const { container } = render({
      data: dataMockWithStyle,
      segmentsStyle: { opacity: '.5' },
      segmentsTabIndex: 2,
      rounded: true,
    });
    const paths = container.querySelectorAll('path');

    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke', 'black');
      expect(path).toHaveAttribute('tabindex', '2');
      expect(path).toHaveAttribute('stroke-linecap', 'round');
      expect(path).toHaveStyle(`
        opacity: .5;
        fill: green;
      `);
    });
  });

  describe('lineWidth prop', () => {
    it('render path with "stroke-width" equal to the half of "lineWidth" prop', () => {
      const { container } = render({
        lineWidth: 5,
      });
      const path = container.querySelector('path');
      expect(path).toHaveAttribute('stroke-width', `${5 / 2}`);
    });
  });

  describe('reveal prop', () => {
    const pathLength = degreesToRadians(25) * 360;
    const singleEntryDataMock = [...dataMock[0]];

    describe('undefined', () => {
      it('render a fully revealed path without "strokeDasharray" nor "strokeDashoffset"', () => {
        const { container } = render({
          data: singleEntryDataMock,
        });

        const path = container.querySelector('path');
        expect(path).not.toHaveAttribute('stroke-dasharray');
        expect(path).not.toHaveAttribute('stroke-dashoffset');
      });
    });

    describe('100', () => {
      it('render a fully revealed path with "strokeDasharray" === path length & "strokeDashoffset" === 0', () => {
        const { container } = render({
          data: singleEntryDataMock,
          reveal: 100,
        });

        const path = container.querySelector('path');
        expect(path).toHaveAttribute('stroke-dasharray', `${pathLength}`);
        expect(path).toHaveAttribute('stroke-dashoffset', '0');
      });
    });

    describe('0', () => {
      it('render a fully hidden path with "strokeDashoffset" === "strokeDasharray"', () => {
        const { container } = render({
          data: singleEntryDataMock,
          reveal: 0,
        });

        const path = container.querySelector('path');
        expect(path).toHaveAttribute('stroke-dasharray', `${pathLength}`);
        expect(path).toHaveAttribute('stroke-dashoffset', `${pathLength}`);
      });

      describe('with negative "lengthAngle"', () => {
        it('Renders same "strokeDashoffset" value', () => {
          const { container } = render({
            data: singleEntryDataMock,
            lengthAngle: -360,
            reveal: 0,
          });

          const path = container.querySelector('path');
          expect(path).toHaveAttribute('stroke-dasharray', `${pathLength}`);
          expect(path).toHaveAttribute('stroke-dashoffset', `${pathLength}`);
        });
      });
    });
  });

  describe('Event handlers props', () => {
    describe.each([
      ['onBlur', 'blur', fireEvent.blur],
      ['onClick', 'click', fireEvent.click],
      ['onFocus', 'focus', fireEvent.focus],
      ['onKeyDown', 'keydown', fireEvent.keyDown],
      ['onMouseOut', 'mouseout', fireEvent.mouseOut],
      ['onMouseOver', 'mouseover', fireEvent.mouseOver],
    ])('%s', (propName, eventType, event) => {
      it('fire callback with expected arguments', () => {
        const eventCallbackMock = jest.fn((e) => e.persist());
        const { container } = render({
          [propName]: eventCallbackMock,
        });
        const segment = container.querySelector('path');
        event(segment);

        expect(eventCallbackMock).toHaveBeenCalledTimes(1);
        expect(eventCallbackMock).toHaveBeenLastCalledWith(
          expect.objectContaining({
            type: eventType,
          }),
          dataMock,
          0
        );
      });
    });
  });
});
