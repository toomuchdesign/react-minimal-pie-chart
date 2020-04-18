import { extractPercentage, valueBetween } from '../utils';
import type { Data, ExtendedData } from '../commonTypes';
import type { Props as ChartProps } from './Chart';

function sumValues(data: Data): number {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].value;
  }
  return sum;
}

// Append "percentage", "degrees" and "startOffset" into each data entry
export default function extendData({
  data,
  lengthAngle: totalAngle,
  totalValue,
  paddingAngle,
}: ChartProps): ExtendedData {
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

    return Object.assign(
      {
        percentage: valueInPercentage,
        degrees,
        startOffset,
      },
      dataEntry
    );
  });
}
