// Taken from: https://github.com/derhuerst/svg-partial-circle
// @TODO: fix/extend svg-partial-circle lib
export default function partialCircle(cx, cy, r, start, end) {
  const length = end - start;
  if (length === 0) return [];

  const fromX = r * Math.cos(start) + cx;
  const fromY = r * Math.sin(start) + cy;
  const toX = r * Math.cos(end) + cx;
  const toY = r * Math.sin(end) + cy;
  const large = Math.abs(length) <= Math.PI ? '0' : '1';
  const sweep = length < 0 ? '0' : '1';

  return [
    ['M', fromX, fromY],
    ['A', r, r, 0, large, sweep, toX, toY],
  ]
}
