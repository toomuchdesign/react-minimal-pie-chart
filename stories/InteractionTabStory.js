import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src';
import { dataPropType } from '../src/propTypes';

function DemoInteractionTab(props) {
  const [selected, setSelected] = useState(undefined);
  const [focused, setFocused] = useState(undefined);

  const onFocusHandler = (_, __, index) => {
    setFocused(index);
  };

  const onBlurHandler = () => {
    setFocused(undefined);
    setSelected(undefined);
  };

  const onKeyDownHandler = (event, propsData, index) => {
    // Enter keypress
    if (event.keyCode === 13) {
      action('CLICK')(event, propsData, index);
      console.log('CLICK', { event, propsData, index });
      setSelected(selected === index ? undefined : index);
    }
  };

  const data = props.data
    .map((entry, i) => {
      if (focused === i) {
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
    <>
      <p>
        Press Tab until focus reaches the Chart or click on the yellow sector
        and press Tab and then Enter.
      </p>
      <PieChart
        data={data}
        radius={40}
        lineWidth={75}
        segmentsStyle={{ transition: 'stroke .3s' }}
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
