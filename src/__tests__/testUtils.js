import parseSVG from 'svg-path-parser';
import { degrees as getDegrees } from '@schwingbat/relative-angle';

const CENTER = {
  x: 50,
  y: 50,
};

export function getArcInfo(element) {
  return getArcPathInfo(element.getAttribute('d'));
}

export function getArcPathInfo(d) {
  const [moveto, arc] = parseSVG(d);
  if (arc.rx !== arc.ry) {
    throw new Error('Provided path is not the section of a circumference');
  }

  let degrees = getDegrees(CENTER, arc) - getDegrees(CENTER, moveto);
  const degreesAbsolute = Math.abs(degrees);

  if (
    (arc.largeArc === true && degreesAbsolute < 180) ||
    (arc.largeArc === false && degreesAbsolute > 180)
  ) {
    degrees = (360 - degreesAbsolute) * Math.sign(degrees) * -1;
  }

  return {
    startAngle: getDegrees(CENTER, moveto),
    lengthAngle: degrees,
    radius: arc.rx,
  };
}
