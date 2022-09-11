import { extractPercentage, valueBetween } from '../utils';
import type { Data, BaseDataEntry, ExtendedData } from '../commonTypes';
import type { PropsWithDefaults as ChartProps } from './Chart';

function sumValues<DataEntry extends BaseDataEntry>(
  data: Data<DataEntry>
): number {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].value;
  }
  return sum;
}

// Append "percentage", "degrees" and "startAngle" to each data entry
export default function extendData<DataEntry extends BaseDataEntry>({
  data,
  lengthAngle: totalAngle,
  totalValue,
  paddingAngle,
  startAngle: chartStartAngle,
}: ChartProps<DataEntry>): ExtendedData<DataEntry> {
  const total = totalValue || sumValues(data);
  const normalizedTotalAngle = valueBetween(totalAngle, -360, 360);
  const numberOfPaddings =
    Math.abs(normalizedTotalAngle) === 360 ? data.length : data.length - 1;
  const singlePaddingDegrees = Math.abs(paddingAngle) * Math.sign(totalAngle);
  const degreesTakenByPadding = singlePaddingDegrees * numberOfPaddings;
  const degreesTakenByPaths = normalizedTotalAngle - degreesTakenByPadding;
  let lastSegmentEnd = 0;
  const extendedData: ExtendedData<DataEntry> = [];

  // @NOTE: Shall we evaluate percentage accordingly to dataEntry.value's sign?
  for (let i = 0; i < data.length; i++) {
    const dataEntry = data[i];
    const valueInPercentage = total === 0 ? 0 : (dataEntry.value / total) * 100;
    const degrees = extractPercentage(degreesTakenByPaths, valueInPercentage);
    const startAngle = lastSegmentEnd + chartStartAngle;
    lastSegmentEnd = lastSegmentEnd + degrees + singlePaddingDegrees;
    extendedData.push(
      Object.assign(
        {
          percentage: valueInPercentage,
          startAngle,
          degrees,
        },
        dataEntry
      )
    );
  }
  return extendedData;
}
