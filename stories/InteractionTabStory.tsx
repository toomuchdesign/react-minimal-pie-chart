import React, { useState, ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';
import PieChart from '../src';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
};

function DemoInteractionTab(props: Props) {
  const [selected, setSelected] = useState<undefined | number>(0);
  const [focused, setFocused] = useState<undefined | number>(undefined);

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
        onKeyDown={(event, propsData, index) => {
          // Enter keypress
          if (event.keyCode === 13) {
            action('CLICK')(event, propsData, index);
            console.log('CLICK', { event, propsData, index });
            setSelected(selected === index ? undefined : index);
          }
        }}
        onFocus={(_, __, index) => {
          setFocused(index);
        }}
        onBlur={() => setFocused(undefined)}
      />
    </>
  );
}

export default DemoInteractionTab;
