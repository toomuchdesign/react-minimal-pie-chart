import React from 'react';
import { act, render, dataMock, getArcInfo } from './testUtils';
import { degreesToRadians, extractPercentage } from '../utils';
import { pieChartDefaultProps } from '../../src';

jest.useFakeTimers();

beforeAll(() => {
  /// @ts-expect-error: this is a partial mock
  global.requestAnimationFrame = (callback: () => void) => {
    callback();
    return 'id';
  };
});

describe('Chart', () => {
  describe('SVG root element', () => {
    it('receive className, style and children props', () => {
      const { container } = render({
        className: 'foo',
        style: { color: 'green' },
        children: <defs />,
      });
      const root = container.firstChild;

      // @ts-expect-error: ChildNode type doesn't have tagName prop
      expect(root.tagName).toBe('svg');
      expect(root).toHaveClass('foo');
      expect(root).toHaveStyle({ color: 'green' });

      const children = container.querySelector('svg > defs');
      expect(children).toBeInTheDocument();
    });
  });

  describe('data prop', () => {
    it('renders empty SVG element when is undefined', () => {
      const { container } = render({
        data: undefined,
      });
      const svg = container.querySelector('svg');
      expect(svg).toBeEmptyDOMElement();
    });

    it('render a <Title> element if data[].title provided', () => {
      const { container } = render({
        data: [{ title: 'title-value', value: 10, color: 'blue' }],
      });

      const title = container.querySelector('title');
      expect(title).toHaveTextContent('title-value');
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
      expect(
        pathsTotalLengthAngle + totalPaddingDegrees
      ).toEqualWithRoundingError(lengthAngle);
    });
  });

  describe('background prop', () => {
    it('render an extra background segment long as the whole chart', () => {
      const { container } = render({
        startAngle: 0,
        lengthAngle: 200,
        background: 'green',
      });
      const paths = Array.from(container.querySelectorAll('path'));
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
      const paths = Array.from(container.querySelectorAll('path'));
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
        const segmentRadius = pieChartDefaultProps.radius / 2;
        const lengthAngle = pieChartDefaultProps.lengthAngle;
        const fullPathLength = degreesToRadians(segmentRadius) * lengthAngle;
        let hiddenPercentage;
        const initialProps = {
          data: [dataMock[0]],
          animate: true,
          reveal,
        };
        const { container, reRender } = render(initialProps);
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
        reRender({
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
      const consoleError = jest.spyOn(console, 'error');
      const { unmount } = render({
        animate: true,
      });

      unmount();
      // Trigger async initial animation
      act(() => {
        jest.runAllTimers();
      });

      // @ts-expect-error: This is a Jest mocke
      console.error.mockRestore();
      expect(consoleError).not.toHaveBeenCalled();
    });

    describe('stroke-dashoffset attribute', () => {
      it("doesn't generate zero rounding issues after animation (GitHub: #133)", () => {
        const { container } = render({
          data: [
            { value: 1, color: 'red' },
            { value: 1.6, color: 'blue' },
          ],
          animate: true,
        });

        // Trigger async initial animation
        act(() => {
          jest.runAllTimers();
        });

        // Expect all segments to be fully exposed
        container.querySelectorAll('path').forEach((path) => {
          expect(path).toHaveAttribute('stroke-dashoffset', '0');
        });
      });
    });
  });
});
