import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { PieChart, pieChartDefaultProps, PieChartProps } from '../../src';

function DemoInteraction(props: PieChartProps) {
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

  return (
    <PieChart
      data={data}
      radius={pieChartDefaultProps.radius - 6}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      onClick={(event, index) => {
        action('CLICK')(event, index);
        console.log('CLICK', { event, index });
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default DemoInteraction;
