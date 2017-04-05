import partialCircle from '../partialCircle';
// API's: cx, cy, r, start, end

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
    const M = actual[0];

    expect(M[1]).toBe(100);
    expect(M[2]).toBe(50);
  });

  it('Should return an "A" command representing the point where the arc ends', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const A = actual[1];

    expect(A[6]).toBe(50);
    expect(A[7]).toBe(100);
  });

  it('Should return an "A" command with correct radius values', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const A = actual[1];

    expect(A[1]).toBe(50);
    expect(A[2]).toBe(50);
  });

  it('Should return an "A" command with "large" flag disabled for arcs < 180°', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const A = actual[1];

    expect(A[4]).toBe('0');
  });

  it('Should return an "A" command with "sweep" flag enabled for arcs with positive direction', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(90));
    const A = actual[1];

    expect(A[5]).toBe('1');
  });

  it('Should return an "A" command with "sweep" flag enabled for arcs with negative direction', () => {
    const actual = partialCircle(50, 50, 50, 0, degreesToRadians(-90));
    const A = actual[1];

    expect(A[5]).toBe('0');
  });
});
