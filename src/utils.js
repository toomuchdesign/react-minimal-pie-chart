const PI = Math.PI;

export function degreesToRadians(degrees) {
  return (degrees * PI) / 180;
}

export function evaluateLabelTextAnchor({
  labelPosition,
  lineWidth,
  labelHorizontalShift,
} = {}) {
  // Label in the vertical center
  if (labelHorizontalShift === 0) {
    return 'middle';
  }
  // Outward label
  if (labelPosition > 100) {
    return labelHorizontalShift > 0 ? 'start' : 'end';
  }
  // Inward label
  const innerRadius = 100 - lineWidth;
  if (labelPosition < innerRadius) {
    return labelHorizontalShift > 0 ? 'end' : 'start';
  }
  // Overlying label
  return 'middle';
}

export function valueBetween(value, min, max) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

export function extractPercentage(value, percentage) {
  return (value * percentage) / 100;
}
