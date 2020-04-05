import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src';
import { dataPropType } from '../src/propTypes';

function DemoInteraction(props) {
  const [selected, setSelected] = useState(undefined);
  const [hovered, setHovered] = useState(undefined);

  const onMouseOverHandler = (_, __, index) => {
    setHovered(index);
  };

  const onMouseOutHandler = () => {
    setHovered(undefined);
  };

  const onClickHandler = (event, propsData, index) => {
    action('CLICK')(event, propsData, index);
    console.log('CLICK', { event, propsData, index });
    setSelected(index);
  };

  const data = props.data
    .map((entry, i) => {
      if (hovered === i) {
        return {
          ...entry,
          color: 'grey',
        };
      }
      return entry;
    })
    .map((entry, i) => {
      if (selected === i) {
        return {
          ...entry,
          ...{ style: { strokeWidth: 35 } },
        };
      }
      return entry;
    });

  return (
    <PieChart
      data={data}
      radius={40}
      lineWidth={75}
      segmentsStyle={{ transition: 'stroke .3s' }}
      onClick={onClickHandler}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
    />
  );
}

DemoInteraction.propTypes = {
  data: dataPropType,
};

export default DemoInteraction;
