export function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function valueBetween(value: number, min: number, max: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

export function extractPercentage(value: number, percentage: number) {
  return (value * percentage) / 100;
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

export function functionProp<Prop, Payload>(
  prop: Prop,
  payload?: Payload
  // @ts-ignore
): Prop extends Function ? ReturnType<Prop> : Prop {
  return typeof prop === 'function' ? prop(payload) : prop;
}
