import parseSVG from 'svg-path-parser';
import { degrees as getDegrees } from '@schwingbat/relative-angle';

export const DEFAULT_ORIGIN = {
  x: 50,
  y: 50,
};

export function getArcInfo(element, { arcOrigin = DEFAULT_ORIGIN } = {}) {
  const d = element.getAttribute('d');
  const [moveto, arc] = parseSVG(d);

  if (arc.rx !== arc.ry) {
    throw new Error('Provided path is not the section of a circumference');
  }

  let degrees = getDegrees(arcOrigin, arc) - getDegrees(arcOrigin, moveto);
  const degreesAbsolute = Math.abs(degrees);

  if (
    (arc.largeArc === true && degreesAbsolute < 180) ||
    (arc.largeArc === false && degreesAbsolute > 180)
  ) {
    degrees = (360 - degreesAbsolute) * Math.sign(degrees) * -1;
  }

  return {
    startPoint: {
      x: moveto.x,
      y: moveto.y,
    },
    startAngle: getDegrees(arcOrigin, moveto),
    lengthAngle: degrees,
    radius: arc.rx,
    origin: arcOrigin,
  };
}
