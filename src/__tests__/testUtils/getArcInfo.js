import parseSVG from 'svg-path-parser';
import { degrees as getDegrees } from '@schwingbat/relative-angle';
import { getArcCenter } from './getArcCenter';

function getAbsoluteAngle(radius, point) {
  const relativeAngle = getDegrees(radius, point);
  if (relativeAngle < 0) {
    return 360 + relativeAngle;
  }
  return relativeAngle;
}

/*
 * Known issues:
 * - Paths with non-integer center/startAngle/lengthAngle values
 *   generate respective values with rounding issues
 */
export function getArcInfo(element) {
  const d = element.getAttribute('d');
  const [moveto, arc] = parseSVG(d);

  if (arc.rx !== arc.ry) {
    throw new Error('Provided path is not the section of a circumference');
  }

  const center = getArcCenter(
    moveto.x,
    moveto.y,
    arc.rx,
    arc.ry,
    arc.xAxisRotation,
    arc.largeArc ? 1 : 0,
    arc.sweep ? 1 : 0,
    arc.x,
    arc.y
  );

  // @HACK Magic Number: convert rounding errors like 1.99999999999999 to 2.0000000000000
  // center.x = Number(center.x.toFixed(13));
  // center.y = Number(center.y.toFixed(13));

  const startAngle = getAbsoluteAngle(center, moveto);
  let lengthAngle = getAbsoluteAngle(center, arc) - startAngle;
  const lengthAngleAbsolute = Math.abs(lengthAngle);

  if (
    (arc.largeArc === true && lengthAngleAbsolute < 180) ||
    (arc.largeArc === false && lengthAngleAbsolute > 180)
  ) {
    lengthAngle = (360 - lengthAngleAbsolute) * Math.sign(lengthAngle) * -1;
  }

  return {
    startPoint: {
      x: moveto.x,
      y: moveto.y,
    },
    startAngle,
    lengthAngle,
    radius: arc.rx,
    center,
  };
}
