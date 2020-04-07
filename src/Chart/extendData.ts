import { extractPercentage, valueBetween } from '../utils';
import type { Data } from '../commonTypes';
import type { Props as ChartProps } from './Chart';

function sumValues(data: Data) {
  return data.reduce((acc, dataEntry) => acc + dataEntry.value, 0);
}

// Append "percentage", "degrees" and "startOffset" into each data entry
export default function extendData({
  data,
  lengthAngle: totalAngle,
  totalValue,
  paddingAngle,
}: ChartProps) {
  const total = totalValue || sumValues(data);
  const normalizedTotalAngle = valueBetween(totalAngle, -360, 360);
  const numberOfPaddings =
    Math.abs(normalizedTotalAngle) === 360 ? data.length : data.length - 1;
  const singlePaddingDegrees = Math.abs(paddingAngle) * Math.sign(totalAngle);
  const degreesTakenByPadding = singlePaddingDegrees * numberOfPaddings;
  const degreesTakenByPaths = normalizedTotalAngle - degreesTakenByPadding;
  let lastSegmentEnd = 0;

  // @NOTE: Shall we evaluate percentage accordingly to dataEntry.value's sign?
  return data.map((dataEntry) => {
    const valueInPercentage = total === 0 ? 0 : (dataEntry.value / total) * 100;
    const degrees = extractPercentage(degreesTakenByPaths, valueInPercentage);
    const startOffset = lastSegmentEnd;
    lastSegmentEnd = lastSegmentEnd + degrees + singlePaddingDegrees;

    return {
      percentage: valueInPercentage,
      degrees,
      startOffset,
      ...dataEntry,
    };
  });
}
