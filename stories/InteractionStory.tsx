import React, { useState, ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
};

function DemoInteraction(props: Props) {
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
      radius={PieChart.defaultProps.radius - 6}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(_, index) => (index === selected ? 6 : 1)}
      onClick={(event, propsData, index) => {
        action('CLICK')(event, propsData, index);
        console.log('CLICK', { event, propsData, index });
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

export default DemoInteraction;
