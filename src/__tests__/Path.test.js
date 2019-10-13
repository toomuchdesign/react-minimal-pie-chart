import { degreesToRadians } from '../utils';
import { render, dataMock } from './Chart.test.js';

describe('Path', () => {
  it('render one path for each entry in props.data', () => {
    const { container } = render();
    const paths = container.querySelectorAll('path');
    expect(paths.length).toEqual(dataMock.length);
    paths.forEach(path => {
      expect(path).toHaveAttribute('d', expect.any(String));
    });
  });

  it('get empty "d" attributes when data values sum equals 0', () => {
    const { container } = render({
      data: [{ value: 0 }, { value: 0 }],
    });
    const paths = container.querySelectorAll('path');
    expect(paths.length).toEqual(2);
    paths.forEach(path => {
      expect(path).toHaveAttribute('d', '');
    });
  });

  it('receive "segmentsStyle", "rounded", "data.color" and "data.style" props', () => {
    const dataMockWithStyle = dataMock.map(entry => ({
      ...entry,
      ...{
        color: 'black',
        style: { fill: 'green' },
      },
    }));
    const { container } = render({
      data: dataMockWithStyle,
      segmentsStyle: { opacity: '.5' },
      rounded: true,
    });
    const paths = container.querySelectorAll('path');

    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke', 'black');
      expect(path).toHaveAttribute('stroke-linecap', 'round');
      expect(path).toHaveStyle(`
        opacity: .5;
        fill: green;
      `);
    });
  });

  it('render path with "stroke-width" equal to the half of "lineWidth" prop', () => {
    const { container } = render({
      lineWidth: 5,
    });
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke-width', `${5 / 2}`);
  });

  describe('reveal', () => {
    const pathLength = degreesToRadians(25) * 360;
    const singleEntryDataMock = [...dataMock[0]];

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
});
