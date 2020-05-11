import React, { useState, ComponentProps } from 'react';
import ReactTooltip from 'react-tooltip';
import { PieChart } from '../src';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
};

function makeTooltipContent(entry: Props['data'][0]) {
  return `Sector ${entry.tooltip} has value ${entry.value}`;
}

function ToolTip(props: Props) {
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
