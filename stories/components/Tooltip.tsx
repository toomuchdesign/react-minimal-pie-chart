import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { PieChart, PieChartProps } from '../../src';

type BaseData = PieChartProps['data'][number];

function makeTooltipContent(
  entry: BaseData & {
    tooltip: BaseData['title'];
  }
) {
  return `Sector ${entry.tooltip} has value ${entry.value}`;
}

function ToolTip(props: PieChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = props.data.map(({ title, ...entry }) => {
    return {
      ...entry,
      tooltip: title,
    };
  });

  return (
    <div data-tip="" data-for="chart">
      <PieChart
        data={data}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered === 'number' ? makeTooltipContent(data[hovered]) : null
        }
      />
    </div>
  );
}

export default ToolTip;
