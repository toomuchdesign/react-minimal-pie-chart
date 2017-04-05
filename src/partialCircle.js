// Taken from: https://github.com/derhuerst/svg-partial-circle
// TODO: fix/extend svg-partial-circle lib
export default function partialCircle(cx, cy, r, start, end) {
  const length = end - start;
  if (length === 0) return [];

  const fromX = cx + r * Math.cos(start);
  const fromY = cy + r * Math.sin(start);
  const toX = cx + r * Math.cos(end);
  const toY = cy + r * Math.sin(end);
  const large = Math.abs(length) <= Math.PI ? '0' : '1';
  const sweep = length < 0 ? '0' : '1';

  return [
    ['M', fromX, fromY],
    ['A', r, r, 0, large, sweep, toX, toY],
  ]
}
