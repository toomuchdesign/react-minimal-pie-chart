// @ts-nocheck
import React from 'react';
import { render, dataMock } from './testUtils';

export const expectedLabelProps = {
  x: expect.any(Number),
  y: expect.any(Number),
  dx: expect.any(Number),
  dy: expect.any(Number),
  textAnchor: expect.any(String),
  data: dataMock.map((entry) => ({
    ...entry,
    degrees: expect.any(Number),
    startOffset: expect.any(Number),
    percentage: expect.any(Number),
  })),
  dataIndex: expect.any(Number),
  color: expect.any(String),
};

describe('Label', () => {
  describe('label prop', () => {
    describe('true', () => {
      it('renders 3 <text> elements with expected text and "fill" attribute', () => {
        const { container } = render({ label: true });
        const labels = container.querySelectorAll('text');

        expect(labels.length).toBe(dataMock.length);
        labels.forEach((label, index) => {
          expect(label).toHaveTextContent(`${dataMock[index].value}`);
          expect(label).toHaveAttribute('fill', dataMock[index].color);
        });
      });
    });

    describe('provided as function returning a value', () => {
      it('renders 3 <text> elements with expected content', () => {
        const { container } = render({
          label: (props) => props.dataIndex,
        });

        container.querySelectorAll('text').forEach((label, index) => {
          expect(label).toHaveTextContent(index);
        });
      });

      it('receives expected "props" object', () => {
        const labelMock = jest.fn();
        render({
          label: labelMock,
        });

        const expected = {
          key: expect.any(String),
          ...expectedLabelProps,
        };
        expect(labelMock).toHaveBeenCalledTimes(dataMock.length);
        expect(labelMock).toHaveBeenCalledWith(expected);
      });
    });

    describe('provided as function returning an element', () => {
      it('render returned elements', () => {
        const { container } = render({
          label: (props) => (
            <text key={props.dataIndex}>{props.dataIndex}</text>
          ),
        });

        container.querySelectorAll('text').forEach((label, index) => {
          expect(label).toHaveTextContent(index);
        });
      });
    });

    describe('provided as element', () => {
      it('renders with expected props', () => {
        const ComponentMock = jest.fn(() => null);
        render({
          label: <ComponentMock />,
        });

        expect(ComponentMock).toHaveBeenCalledTimes(dataMock.length);
        expect(ComponentMock).toHaveBeenCalledWith(expectedLabelProps, {});
      });
    });
  });

  describe('labelStyle prop', () => {
    it('assign provided value to each label as className', () => {
      const { container } = render({
        label: true,
        labelStyle: { pointerEvents: 'none' },
      });

      container.querySelectorAll('text').forEach((label) => {
        expect(label).toHaveStyle({ pointerEvents: 'none' });
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
          data: [{ value: 1 }],
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
