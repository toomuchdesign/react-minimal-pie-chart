import React, { useState, ComponentProps } from 'react';
import PieChart from '../src';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
};

function FullOption(props: Props) {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px',
      }}
      data={data}
      radius={40}
      lineWidth={60}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(_, index) => (index === selected ? 10 : 1)}
      animate
      label={({ data, dataIndex }) =>
        Math.round(data[dataIndex].percentage) + '%'
      }
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: '#fff',
        opacity: 0.75,
        pointerEvents: 'none',
        dominantBaseline: 'central', //@TODO remove if when #149 gets implemented
      }}
      onClick={(_, __, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, __, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default FullOption;
