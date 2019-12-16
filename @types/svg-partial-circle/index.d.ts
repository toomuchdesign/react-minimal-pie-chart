declare module 'svg-partial-circle';

export default function partialCircle(
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number
): [
  ['M', number, number],
  ['A', number, number, 0, number, number, number, number]
];
