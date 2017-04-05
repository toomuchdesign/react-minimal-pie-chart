// Taken from: https://github.com/derhuerst/svg-partial-circle
// TODO: fix/extend svg-partial-circle lib
export default function partialCircle (cx, cy, r, start, end) {
	const fromX = cx + r * Math.cos(end);
	const fromY = cy + r * Math.sin(end);
	const toX = cx + r * Math.cos(start);
	const toY = cy + r * Math.sin(start);
	const large = (end - start) <= Math.PI ? '0' : '1';

	if ((end - start) === 0) return []
	return [
		['M', fromX, fromY],
		['A', r, r, 0, large, 0, toX, toY],
	]
}
