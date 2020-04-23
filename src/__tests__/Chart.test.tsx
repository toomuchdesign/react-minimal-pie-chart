// @ts-nocheck
import React from 'react';
import { act, render, dataMock, getArcInfo, PieChart } from './testUtils';
import { degreesToRadians, extractPercentage } from '../utils';

jest.useFakeTimers();

beforeAll(() => {
  global.requestAnimationFrame = (callback) => {
    callback();
    return 'id';
  };
});

describe('Chart', () => {
  describe('data prop', () => {
    it('renders empty SVG element when is undefined', () => {
      const { container } = render({
        data: undefined,
      });
      const svg = container.querySelector('svg');
      expect(svg).toBeEmpty();
    });

    it('render a <Title> element if data[].title provided', () => {
      const { container } = render({
        data: [{ title: 'title-value', value: 10, color: 'blue' }],
      });

      const title = container.querySelector('title');
      expect(title).toHaveTextContent('title-value');
    });
  });

  describe('wrapper element', () => {
    it('receive "className" and "style" props', () => {
      const { container } = render({
        className: 'foo',
        style: { color: 'green' },
      });
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('class', 'foo');
      expect(wrapper).toHaveStyle({ color: 'green' });
    });
  });

  describe('viewBoxSize prop', () => {
    it.each`
      viewBoxSize   | expectedSize
      ${undefined}  | ${[100, 100]}
      ${[500, 500]} | ${[500, 500]}
      ${[500, 250]} | ${[500, 250]}
    `(
      'renders full-width chart in a SVG viewBox of given size',
      ({ viewBoxSize, expectedSize }) => {
        const [expectedWidth, expectedHeight] = expectedSize;
        const { container } = render({
          viewBoxSize,
        });
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute(
          'viewBox',
          `0 0 ${expectedWidth} ${expectedHeight}`
        );
      }
    );
  });

  describe('lengthAngle prop', () => {
    it.each`
      lengthAngle
      ${270}
      ${-270}
    `(
      'render a set of arcs which total length angle equals $lengthAngle',
      ({ lengthAngle }) => {
        let pathsTotalLengthAngle = 0;
        const { container } = render({
          lengthAngle,
        });
        container.querySelectorAll('path').forEach((path) => {
          pathsTotalLengthAngle += getArcInfo(path).lengthAngle;
        });
        expect(pathsTotalLengthAngle).toEqual(lengthAngle);
      }
    );
  });

  describe('paddingAngle prop', () => {
    it('render a set of arcs which total length angle + paddings equals "lengthAngle"', () => {
      const lengthAngle = 300;
      let pathsTotalLengthAngle = 0;
      const totalPaddingDegrees = 10 * (dataMock.length - 1);

      const { container } = render({
        lengthAngle,
        paddingAngle: 10,
      });
      container.querySelectorAll('path').forEach((path) => {
        pathsTotalLengthAngle += getArcInfo(path).lengthAngle;
      });
      expect(lengthAngle).toEqualWithRoundingError(
        pathsTotalLengthAngle + totalPaddingDegrees
      );
    });
  });

  describe('background prop', () => {
    it('render an extra background segment long as the whole chart', () => {
      const { container } = render({
        startAngle: 0,
        lengthAngle: 200,
        background: 'green',
      });
      const paths = container.querySelectorAll('path');
      const [background, segment] = paths;
      const backgroundInfo = getArcInfo(background);
      const segmentInfo = getArcInfo(segment);

      expect(paths.length).toBe(dataMock.length + 1);
      expect(backgroundInfo.startAngle).toBe(0);
      expect(backgroundInfo.lengthAngle).toBe(200);
      expect(backgroundInfo.radius).toEqual(segmentInfo.radius);
      expect(backgroundInfo.center).toMatchObject({
        x: expect.toEqualWithRoundingError(segmentInfo.center.x),
        y: expect.toEqualWithRoundingError(segmentInfo.center.y),
      });
      expect(background).toHaveAttribute('fill', 'none');
      expect(background).toHaveAttribute('stroke', 'green');
      expect(background).not.toHaveAttribute('stroke-linecap');
      expect(background).toHaveAttribute(
        'stroke-width',
        segment.getAttribute('stroke-width')
      );
    });

    it('render an extra background segment with expected stroke linecap', () => {
      const { container } = render({
        background: 'green',
        rounded: true,
      });
      const paths = container.querySelectorAll('path');
      const [background] = paths;
      expect(paths.length).toBe(dataMock.length + 1);
      expect(background).toHaveAttribute('stroke-linecap', 'round');
    });
  });

  describe('animate prop', () => {
    describe('Segments "style.transition" prop', () => {
      it('receive "stroke-dashoffset" transition prop with custom duration/easing', () => {
        const { container } = render({
          animate: true,
          animationDuration: 100,
          animationEasing: 'ease',
        });
        const firstPath = container.querySelector('path');
        expect(firstPath).toHaveStyle({
          transition: 'stroke-dashoffset 100ms ease',
        });
      });

      it('merge autogenerated CSS transition prop with the one optionally provided by "segmentsStyle"', () => {
        const { container } = render({
          segmentsStyle: {
            transition: 'custom-transition',
          },
          animate: true,
          animationDuration: 100,
          animationEasing: 'ease',
        });
        const firstPath = container.querySelector('path');
        expect(firstPath).toHaveStyle({
          transition: 'stroke-dashoffset 100ms ease,custom-transition',
        });
      });
    });

    describe.each`
      reveal       | expectedRevealedPercentage
      ${undefined} | ${100}
      ${25}        | ${25}
    `('reveal === ${reveal}', ({ reveal, expectedRevealedPercentage }) => {
      it('re-render on did mount revealing the expected portion of segment', () => {
        const segmentRadius = PieChart.defaultProps.radius / 2;
        const lengthAngle = 360;
        const fullPathLength = degreesToRadians(segmentRadius) * lengthAngle;
        let hiddenPercentage;
        const initialProps = {
          data: [...dataMock[0]],
          animate: true,
          lengthAngle,
          reveal,
        };
        const { container, rerender } = render(initialProps);
        const path = container.querySelector('path');

        // Paths are hidden
        hiddenPercentage = 100;
        expect(path).toHaveAttribute('stroke-dasharray', `${fullPathLength}`);
        expect(path).toHaveAttribute(
          'stroke-dashoffset',
          `${extractPercentage(fullPathLength, hiddenPercentage)}`
        );

        // Trigger async initial animation
        act(() => {
          jest.runAllTimers();
        });

        // Paths are revealed
        hiddenPercentage = 100 - expectedRevealedPercentage;
        expect(path).toHaveAttribute('stroke-dasharray', `${fullPathLength}`);
        expect(path).toHaveAttribute(
          'stroke-dashoffset',
          `${extractPercentage(fullPathLength, hiddenPercentage)}`
        );

        // Update reveal prop after initial animation
        const newReveal = 77;
        rerender({
          ...initialProps,
          reveal: newReveal,
        });

        hiddenPercentage = 100 - newReveal;
        expect(path).toHaveAttribute('stroke-dasharray', `${fullPathLength}`);
        expect(path).toHaveAttribute(
          'stroke-dashoffset',
          `${extractPercentage(fullPathLength, hiddenPercentage)}`
        );
      });
    });

    it("don't re-render when component is unmounted", () => {
      // Simulate edge case of animation fired after component was unmounted
      // See: https://github.com/toomuchdesign/react-minimal-pie-chart/issues/8
      jest.spyOn(console, 'error');
      const { unmount } = render({
        animate: true,
      });

      unmount();
      // Trigger async initial animation
      act(() => {
        jest.runAllTimers();
      });

      expect(console.error).not.toHaveBeenCalled();
      console.error.mockRestore();
    });
  });

  describe('children prop', () => {
    it('inject anything into rendered <svg>', () => {
      const { container } = render({
        children: <defs />,
      });

      const injectedElement = container.querySelector('svg > defs');
      expect(injectedElement).toBeInTheDocument();
    });
  });
});
