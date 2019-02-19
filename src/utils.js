const PI = Math.PI;

export function degreesToRadians(degrees) {
  return (degrees * PI) / 180;
}

export function evaluateViewBoxSize(ratio, baseSize) {
  // Wide ratio
  if (ratio > 1) {
    return `0 0 ${baseSize} ${baseSize / ratio}`;
  }
  // Narrow/squared ratio
  return `0 0 ${baseSize * ratio} ${baseSize}`;
}
