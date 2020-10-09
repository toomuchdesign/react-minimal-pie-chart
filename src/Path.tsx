import React from 'react';
import type { SVGProps } from 'react';
import partialCircle from 'svg-partial-circle';
import {
  bisectorAngle,
  degreesToRadians,
  extractPercentage,
  isNumber,
  shiftVectorAlongAngle,
  valueBetween,
} from './utils';

export function makePathCommands(
  cx: number,
  cy: number,
  startAngle: number,
  lengthAngle: number,
  radius: number
): string {
  const patchedLengthAngle = valueBetween(lengthAngle, -359.999, 359.999);

  return partialCircle(
    cx,
    cy, // center X and Y
    radius,
    degreesToRadians(startAngle),
    degreesToRadians(startAngle + patchedLengthAngle)
  )
    .map((command) => command.join(' '))
    .join(' ');
}

type Props = SVGProps<SVGPathElement> & {
  cx: number;
  cy: number;
  lengthAngle: number;
  lineWidth: number;
  radius: number;
  reveal?: number;
  rounded?: boolean;
  shift?: number;
  startAngle: number;
  title?: string | number;
};

export default function ReactMinimalPieChartPath({
  cx,
  cy,
  lengthAngle,
  lineWidth,
  radius,
  shift = 0,
  reveal,
  rounded,
  startAngle,
  title,
  ...props
}: Props) {
  const pathRadius = radius - lineWidth / 2;
  //@NOTE This shift might be rendered as a translation in future
  const { dx, dy } = shiftVectorAlongAngle(
    bisectorAngle(startAngle, lengthAngle),
    shift
  );

  const pathCommands = makePathCommands(
    cx + dx,
    cy + dy,
    startAngle,
    lengthAngle,
    pathRadius
  );
  let strokeDasharray;
  let strokeDashoffset;

  // Animate/hide paths with "stroke-dasharray" + "stroke-dashoffset"
  // https://css-tricks.com/svg-line-animation-works/
  if (isNumber(reveal)) {
    const pathLength = degreesToRadians(pathRadius) * lengthAngle;
    strokeDasharray = Math.abs(pathLength);
    strokeDashoffset =
      strokeDasharray - extractPercentage(strokeDasharray, reveal);
  }

  return (
    <path
      d={pathCommands}
      fill="none"
      strokeWidth={lineWidth}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap={rounded ? 'round' : undefined}
      {...props}
    >
      {title && <title>{title}</title>}
    </path>
  );
}
