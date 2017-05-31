import partialCircle from '../partialCircle';

/*
 * API's: cx, cy, r, start, end
 *
 * Eg:
 * partialCircle(50, 50, 50, 0, degreesToRadians(90))
 *
 * Result shape: [
 *   [ 'M', 100, 50 ],
 *   [ 'A', 50, 50, 0, '0', '1', 50, 100 ]
 * ]
 */

const degreesToRadians = degrees => ((degrees * Math.PI) / 180);

describe('partialCircle utility', () => {
  it('Should return array containg 2 an "M" and an "A" path command', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const M = actual[0];
    const A = actual[1];

    expect(actual.length).toBe(2);
    expect(M[0]).toBe('M');
    expect(A[0]).toBe('A');
  });

  it('Should return an "M" command representing the point where the arc starts', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const startX = actual[0][1];
    const startY = actual[0][2];

    expect(startX).toBe(100);
    expect(startY).toBe(50);
  });

  it('Should return an "A" command representing the point where the arc ends', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const endX = actual[1][6];
    const endY = actual[1][7];

    expect(endX).toBe(50);
    expect(endY).toBe(100);
  });

  it('Should return an "A" command with correct radius values', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const radiusX = actual[1][1];
    const radiusY = actual[1][2];

    expect(radiusX).toBe(50);
    expect(radiusY).toBe(50);
  });

  it('Should return an "A" command with "large" flag disabled for arcs < 180°', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const largeFlag = actual[1][4];

    expect(largeFlag).toBe('0');
  });

  it('Should return an "A" command with "sweep" flag enabled for arcs with positive direction', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const sweepFlag = actual[1][5];

    expect(sweepFlag).toBe('1');
  });

  it('Should return an "A" command with "sweep" flag disabled for arcs with negative direction', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(-90));
    const sweepFlag = actual[1][5];

    expect(sweepFlag).toBe('0');
  });
});
