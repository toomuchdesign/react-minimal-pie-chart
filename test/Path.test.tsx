import { render, dataMock, getArcInfo, fireEvent } from './testUtils';
import {
  bisectorAngle,
  degreesToRadians,
  extractPercentage,
  shiftVectorAlongAngle,
} from '../src/utils';

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
      data: [
        { value: 0, color: 'red' },
        { value: 0, color: 'green' },
      ],
    });
    const paths = container.querySelectorAll('path');
    expect(paths.length).toEqual(2);
    paths.forEach((path) => {
      expect(path).toHaveAttribute('d', '');
    });
  });

  it('receive "segmentsTabIndex", "rounded" and "data[].color"props', () => {
    const dataMockWithStyle = dataMock.map((entry) => ({
      ...entry,
      ...{
        color: 'black',
      },
    }));
    const { container } = render({
      data: dataMockWithStyle,
      segmentsTabIndex: 2,
      rounded: true,
    });
    const paths = container.querySelectorAll('path');

    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke', 'black');
      expect(path).toHaveAttribute('tabindex', '2');
      expect(path).toHaveAttribute('stroke-linecap', 'round');
    });
  });

  describe('segmentsStyle prop', () => {
    describe.each`
      description      | segmentsStyle                              | expectedStyle
      ${'undefined'}   | ${undefined}                               | ${null}
      ${'as object'}   | ${{ color: 'green' }}                      | ${{ color: 'green' }}
      ${'as function'} | ${(index: number) => ({ color: 'green' })} | ${{ color: 'green' }}
      ${'as function'} | ${jest.fn((i) => undefined)}               | ${null}
    `('$description', ({ segmentsStyle, expectedStyle }) => {
      if (jest.isMockFunction(segmentsStyle)) {
        it('gets called with expected arguments', () => {
          render({ segmentsStyle });
          expect(segmentsStyle).toHaveBeenNthCalledWith(1, 0);
          expect(segmentsStyle).toHaveBeenNthCalledWith(2, 1);
          expect(segmentsStyle).toHaveBeenNthCalledWith(3, 2);
        });
      }

      it('segments receives expected style', () => {
        const { container } = render({ segmentsStyle });
        container.querySelectorAll('path').forEach((path) => {
          if (expectedStyle) {
            expect(path).toHaveStyle(expectedStyle);
          } else {
            expect(path.getAttribute('style')).toEqual(expectedStyle);
          }
        });
      });
    });
  });

  describe('segmentsShift prop', () => {
    /*
     * 1- Render both shifted and non-shifted segments
     * 2- Evaluate expected absolute segment's shift
     * 3- Compare shifted and non-shifted segments info
     */
    describe.each`
      description      | segmentsShift               | expectedSegmentsShift
      ${'as number'}   | ${1}                        | ${[1, 1, 1]}
      ${'as function'} | ${(index: number) => index} | ${[0, 1, 2]}
      ${'as function'} | ${jest.fn()}                | ${[0, 0, 0]}
    `('$description', ({ segmentsShift, expectedSegmentsShift }) => {
      if (jest.isMockFunction(segmentsShift)) {
        it('gets called with expected arguments', () => {
          render({ segmentsShift });
          expect(segmentsShift).toHaveBeenNthCalledWith(1, 0);
          expect(segmentsShift).toHaveBeenNthCalledWith(2, 1);
          expect(segmentsShift).toHaveBeenNthCalledWith(3, 2);
        });
      }

      it('renders segments translated radially', () => {
        const { container: originalPie } = render();
        const { container: shiftedPie } = render({
          segmentsShift,
        });
        const originalPaths = originalPie.querySelectorAll('path');
        const shiftedPaths = shiftedPie.querySelectorAll('path');

        originalPaths.forEach((path, index) => {
          const { startPoint, startAngle, lengthAngle, radius, center } =
            getArcInfo(path);
          const shiftedPathInfo = getArcInfo(shiftedPaths[index]);
          const { dx, dy } = shiftVectorAlongAngle(
            bisectorAngle(startAngle, lengthAngle),
            expectedSegmentsShift[index]
          );

          const expected = {
            startPoint: {
              x: expect.toEqualWithRoundingError(startPoint.x + dx),
              y: startPoint.y + dy,
            },
            startAngle: expect.toEqualWithRoundingError(startAngle),
            lengthAngle: expect.toEqualWithRoundingError(lengthAngle),
            radius: radius,
            center: {
              x: expect.toEqualWithRoundingError(center.x + dx),
              y: expect.toEqualWithRoundingError(center.y + dy),
            },
          };

          expect(shiftedPathInfo).toEqual(expected);
        });
      });
    });
  });

  describe('lineWidth prop', () => {
    it('render path which "stroke-width" attributes equals the provided percentage of radius size', () => {
      const radius = 66;
      const lineWidth = 5;
      const { container } = render({
        radius,
        lineWidth,
      });
      const expectedStrokeWidth = extractPercentage(radius, lineWidth);
      const path = container.querySelector('path');
      expect(path).toHaveAttribute('stroke-width', `${expectedStrokeWidth}`);
    });
  });

  describe('reveal prop', () => {
    const pathLength = degreesToRadians(25) * 360;
    const singleEntryDataMock = [dataMock[0]];

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
        const segmentIndex = 0;
        const segment = container.querySelectorAll('path')[segmentIndex];
        event(segment);

        expect(eventCallbackMock).toHaveBeenCalledTimes(1);
        expect(eventCallbackMock).toHaveBeenLastCalledWith(
          expect.objectContaining({
            type: eventType,
          }),
          segmentIndex
        );
      });
    });
  });
});
