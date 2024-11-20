import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, dataMock, getArcInfo } from './testUtils';
import { degreesToRadians, extractPercentage } from '../src/utils';
import { pieChartDefaultProps } from '../src';
const rgbGreen = 'rgb(0, 128, 0)';

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
      expect(root).toHaveStyle({ color: rgbGreen });

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
    `('reveal === $reveal', ({ reveal, expectedRevealedPercentage }) => {
      it('re-renders on mount revealing the expected portion of segment', () => {
        const segmentRadius = pieChartDefaultProps.radius / 2;
        const lengthAngle = pieChartDefaultProps.lengthAngle;
        const fullPathLength = degreesToRadians(segmentRadius) * lengthAngle;
        let expectedHiddenPercentage;
        const initialProps = {
          data: [dataMock[0]],
          animate: true,
          reveal,
        };
        const { container, reRender } = render(initialProps);
        const path = container.querySelector('path');

        /**
         * @NOTE testing library fires useEffect sync and therefore we can't
         * assert against the DOM before useEffect is executed
         *
         * @TODO Find a way to ensure that segments are hidden on mount:
         *
         * expectedHiddenPercentage = 100;
         * expect(path).toHaveAttribute('stroke-dasharray', `${fullPathLength}`);
         * expect(path).toHaveAttribute(
         *   'stroke-dashoffset',
         *   `${extractPercentage(fullPathLength, expectedHiddenPercentage)}`
         * );
         */

        // Paths are revealed
        expectedHiddenPercentage = 100 - expectedRevealedPercentage;
        expect(path).toHaveAttribute('stroke-dasharray', `${fullPathLength}`);
        expect(path).toHaveAttribute(
          'stroke-dashoffset',
          `${extractPercentage(fullPathLength, expectedHiddenPercentage)}`
        );

        // Update reveal prop after initial animation
        const newReveal = 77;
        reRender({
          ...initialProps,
          reveal: newReveal,
        });

        expectedHiddenPercentage = 100 - newReveal;
        expect(path).toHaveAttribute('stroke-dasharray', `${fullPathLength}`);
        expect(path).toHaveAttribute(
          'stroke-dashoffset',
          `${extractPercentage(fullPathLength, expectedHiddenPercentage)}`
        );
      });
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

        // Expect all segments to be fully exposed
        container.querySelectorAll('path').forEach((path) => {
          expect(path).toHaveAttribute('stroke-dashoffset', '0');
        });
      });
    });
  });
});
