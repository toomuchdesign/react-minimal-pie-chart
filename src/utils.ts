export function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function valueBetween(value: number, min: number, max: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

export function extractPercentage(value: number, percentage: number) {
  return (percentage / 100) * value;
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

export function functionProp<ReturnedProp, Payload>(
  prop: ((args: Payload) => ReturnedProp) | ReturnedProp,
  payload: Payload
): ReturnedProp {
  return typeof prop === 'function'
    ? // @ts-expect-error: cannot find a way to type 2nd prop arg as anything-but-function
      prop(payload)
    : prop;
}

export function makePropsWithDefaults<Result extends Record<string, unknown>>(
  props: Partial<Result>,
  defaultProps: Result
): Result {
  const result: Result = Object.assign({}, defaultProps, props);

  // @NOTE Object.assign doesn't default properties with undefined value (like React defaultProps does)
  for (const key in defaultProps) {
    if (props[key] === undefined) {
      result[key] = defaultProps[key];
    }
  }

  return result;
}
