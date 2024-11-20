import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, dataMock, getArcInfo } from './testUtils';
import {
  bisectorAngle,
  extractPercentage,
  shiftVectorAlongAngle,
} from '../src/utils';
import { pieChartDefaultProps, PieChartProps } from '../src';

function getExpectedLabelRenderProps(dataEntry: PieChartProps['data'][number]) {
  return {
    x: expect.any(Number),
    y: expect.any(Number),
    dx: expect.any(Number),
    dy: expect.any(Number),
    textAnchor: expect.any(String),
    dataEntry: {
      ...dataEntry,
      degrees: expect.any(Number),
      startAngle: expect.any(Number),
      percentage: expect.any(Number),
    },
    dataIndex: expect.any(Number),
  };
}

describe('Label', () => {
  describe('label prop function', () => {
    it('gets called with expected arguments', () => {
      const labelMock = vi.fn();
      render({
        label: labelMock,
      });

      expect(labelMock).toHaveBeenCalledTimes(dataMock.length);
      dataMock.forEach((dataEntry) => {
        const expected = getExpectedLabelRenderProps(dataEntry);
        expect(labelMock).toHaveBeenCalledWith(expected);
      });
    });

    describe('returning a value', () => {
      const labels = [0, null, 'label'];
      describe.each`
        description    | label                                                          | expectedLabels
        ${'number'}    | ${() => -5}                                                    | ${[-5, -5, -5]}
        ${'number'}    | ${({ dataIndex }: { dataIndex: number }) => dataIndex}         | ${[0, 1, 2]}
        ${'string'}    | ${() => 'label'}                                               | ${['label', 'label', 'label']}
        ${'null'}      | ${() => null}                                                  | ${[]}
        ${'undefined'} | ${() => undefined}                                             | ${[]}
        ${'mixed'}     | ${({ dataIndex }: { dataIndex: number }) => labels[dataIndex]} | ${[0, 'label']}
      `('$description', ({ label, expectedLabels }) => {
        it('renders expected <text> elements with expected content', () => {
          const { container } = render({ label });
          const labels = container.querySelectorAll('text');
          expect(labels.length).toBe(expectedLabels.length);

          labels.forEach((label, index) => {
            expect(label).toHaveTextContent(String(expectedLabels[index]));
          });
        });
      });
    });

    describe('an element', () => {
      it('render returned elements', () => {
        const { container } = render({
          label: (props) => (
            <text key={props.dataIndex}>{props.dataIndex}</text>
          ),
        });

        container.querySelectorAll('text').forEach((label, index) => {
          expect(label).toHaveTextContent(`${index}`);
        });
      });
    });
  });

  describe('labelPosition prop', () => {
    const radius = 66;
    const labelPosition = 5;
    const expectedDistanceFromCenter = extractPercentage(radius, labelPosition);
    describe.each`
      description      | segmentsShift               | expectedSegmentsShift
      ${'as number'}   | ${1}                        | ${[1, 1, 1]}
      ${'as function'} | ${(index: number) => index} | ${[0, 1, 2]}
    `(
      '+ segmentShift $description',
      ({ segmentsShift, expectedSegmentsShift }) => {
        it('renders labels translated radially', () => {
          const { container, getAllByText } = render({
            radius,
            labelPosition,
            segmentsShift,
            label: () => 'label',
          });
          const paths = container.querySelectorAll('path');
          const shiftedLabels = getAllByText('label');

          shiftedLabels.forEach((label, index) => {
            const { startAngle, lengthAngle } = getArcInfo(paths[index]);
            const expectedAbsoluteShift =
              expectedDistanceFromCenter + expectedSegmentsShift[index];

            const { dx, dy } = shiftVectorAlongAngle(
              bisectorAngle(startAngle, lengthAngle),
              expectedAbsoluteShift
            );

            expect(label).toHaveAttribute(
              'x',
              `${pieChartDefaultProps.center[0]}`
            );
            expect(label).toHaveAttribute(
              'y',
              `${pieChartDefaultProps.center[1]}`
            );
            expect(label).toHaveAttribute('dx', `${dx}`);
            expect(label).toHaveAttribute('dy', `${dy}`);
          });
        });
      }
    );
  });

  describe('labelStyle prop', () => {
    describe('as object', () => {
      it("pass provided value as labels' style", () => {
        const { getAllByText } = render({
          label: () => 'label',
          labelStyle: { pointerEvents: 'none' },
        });

        getAllByText('label').forEach((label) => {
          expect(label).toHaveStyle({ pointerEvents: 'none' });
        });
      });
    });

    describe('as function', () => {
      it("pass return value as labels' style", () => {
        const { getAllByText } = render({
          label: () => 'label',
          labelStyle: (index) => ({ stroke: dataMock[index].color }),
        });

        getAllByText('label').forEach((label, index) => {
          expect(label).toHaveStyle({ stroke: dataMock[index].color });
        });
      });
    });
  });

  describe('text-alignment and position', () => {
    // @TODO label positioning tests
    const lineWidth = 50;
    const lengthAngle = 90;
    const orientation = {
      bottom: lengthAngle / 2,
      left: 90 + lengthAngle / 2,
      top: 180 + lengthAngle / 2,
      right: 270 + lengthAngle / 2,
    };
    const labelPosition = {
      inside: 25,
      outside: 125,
      over: 75,
    };

    it.each`
      description                  | labelPosition            | startAngle            | expectedAlignment
      ${'outwards on the left'}    | ${labelPosition.outside} | ${orientation.left}   | ${'end'}
      ${'outwards on the right'}   | ${labelPosition.outside} | ${orientation.right}  | ${'start'}
      ${'outwards on the bottom'}  | ${labelPosition.outside} | ${orientation.bottom} | ${'middle'}
      ${'inwards on the left'}     | ${labelPosition.inside}  | ${orientation.left}   | ${'start'}
      ${'inwards on the right'}    | ${labelPosition.inside}  | ${orientation.right}  | ${'end'}
      ${'inwards on the bottom'}   | ${labelPosition.inside}  | ${orientation.bottom} | ${'middle'}
      ${'overlying on the left'}   | ${labelPosition.over}    | ${orientation.left}   | ${'middle'}
      ${'overlying on the right'}  | ${labelPosition.over}    | ${orientation.right}  | ${'middle'}
      ${'overlying on the bottom'} | ${labelPosition.over}    | ${orientation.bottom} | ${'middle'}
    `(
      'Label $description',
      ({ labelPosition, startAngle, expectedAlignment }) => {
        const { getByText } = render({
          data: [{ value: 1, color: 'red' }],
          lineWidth,
          lengthAngle,
          startAngle,
          label: () => 'label',
          labelPosition,
        });
        const label = getByText('label');
        expect(label).toHaveAttribute('text-anchor', expectedAlignment);
      }
    );
  });
});
