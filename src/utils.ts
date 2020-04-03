import type { Props as ChartProps } from './Chart';

function round(number: number): number {
  const divisor = 100000000000000; // 14 decimals
  return Math.round((number + Number.EPSILON) * divisor) / divisor;
}

export function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function evaluateLabelTextAnchor({
  labelPosition,
  lineWidth,
  labelHorizontalShift,
}: {
  labelPosition: number;
  lineWidth: number;
  labelHorizontalShift: number;
}) {
  const dx = round(labelHorizontalShift);
  // Label in the vertical center
  if (dx === 0) {
    return 'middle';
  }
  // Outward label
  if (labelPosition > 100) {
    return dx > 0 ? 'start' : 'end';
  }
  // Inward label
  const innerRadius = 100 - lineWidth;
  if (labelPosition < innerRadius) {
    return dx > 0 ? 'end' : 'start';
  }
  // Overlying label
  return 'middle';
}

export function valueBetween(value: number, min: number, max: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

export function extractPercentage(value: number, percentage: number) {
  return (value * percentage) / 100;
}

export function extractAbsoluteCoordinates(props: ChartProps) {
  const [viewBoxWidth, viewBoxHeight] = props.viewBoxSize;
  const radius = extractPercentage(props.radius, viewBoxWidth);
  return {
    cx: extractPercentage(props.cx, viewBoxWidth),
    cy: extractPercentage(props.cy, viewBoxHeight),
    radius,
    segmentsShift: extractPercentage(props.segmentsShift, radius),
  };
}

export function bisectorAngle(startAngle: number, lengthAngle: number) {
  return startAngle + lengthAngle / 2;
}

export function shiftVectorAlongAngle(angle: number, distance: number) {
  const angleRadians = degreesToRadians(angle);
  return {
    dx: distance * Math.cos(angleRadians),
    dy: distance * Math.sin(angleRadians),
  };
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
