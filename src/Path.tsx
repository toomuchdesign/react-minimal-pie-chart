import React from 'react';
import partialCircle from 'svg-partial-circle';
import {
  bisectorAngle,
  degreesToRadians,
  extractPercentage,
  isNumber,
  shiftVectorAlongAngle,
  valueBetween,
} from './utils';
import type { StyleObject } from './commonTypes';

export function makePathCommands(
  cx: number,
  cy: number,
  startAngle: number,
  lengthAngle: number,
  radius: number
) {
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

type Props = {
  cx: number;
  cy: number;
  fill?: string;
  lengthAngle: number;
  lineWidth: number;
  key?: number | string;
  onBlur?: (event: React.FocusEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onMouseOut?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  radius: number;
  reveal?: number;
  shift?: number;
  startAngle: number;
  stroke?: string;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
  style?: StyleObject;
  tabIndex?: number;
  title?: string | number;
};

export default function Path({
  cx,
  cy,
  lengthAngle,
  lineWidth,
  radius,
  shift = 0,
  reveal,
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
      strokeWidth={lineWidth}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      {...props}
    >
      {title && <title>{title}</title>}
    </path>
  );
}

Path.displayName = 'ReactMinimalPieChartPath';
