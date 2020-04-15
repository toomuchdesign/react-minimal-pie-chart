import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src';
import { dataPropType } from '../src/propTypes';

function DemoInteraction(props) {
  const [selected, setSelected] = useState(0);
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
      radius={40}
      segmentsStyle={{ transition: 'stroke .3s' }}
      segmentsShift={(_, index) => (index === selected ? 10 : 1)}
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
