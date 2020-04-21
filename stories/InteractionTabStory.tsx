import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src';
import { dataPropType } from '../src/propTypes';

function DemoInteractionTab(props) {
  const [selected, setSelected] = useState(0);
  const [focused, setFocused] = useState(undefined);

  const onFocusHandler = (_, __, index) => {
    setFocused(index);
  };

  const onBlurHandler = () => {
    setFocused(undefined);
  };

  const onKeyDownHandler = (event, propsData, index) => {
    // Enter keypress
    if (event.keyCode === 13) {
      action('CLICK')(event, propsData, index);
      console.log('CLICK', { event, propsData, index });
      setSelected(selected === index ? undefined : index);
    }
  };

  const data = props.data.map((entry, i) => {
    let result = entry;
    if (focused === i) {
      result = {
        ...result,
        color: 'grey',
      };
    }
    if (selected === i) {
      result = {
        ...result,
        style: { strokeWidth: 35 },
      };
    }
    return result;
  });

  return (
    <>
      <p>
        Press Tab until focus reaches the Chart or click on the yellow sector
        and press Tab and then Enter.
      </p>
      <PieChart
        data={data}
        radius={40}
        lineWidth={75}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsTabIndex={1}
        onKeyDown={onKeyDownHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
    </>
  );
}

DemoInteractionTab.propTypes = {
  data: dataPropType,
};

export default DemoInteractionTab;
