import React, { useState, ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';
import { PieChart } from '../src';

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
    return result;
  });

  const segmentsStyle = { transition: 'stroke .3s', cursor: 'pointer' };
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
        segmentsStyle={(index) => {
          return index === selected
            ? { ...segmentsStyle, strokeWidth: 35 }
            : segmentsStyle;
        }}
        segmentsTabIndex={1}
        onKeyDown={(event, index) => {
          // Enter keypress
          if (event.keyCode === 13) {
            action('CLICK')(event, index);
            console.log('CLICK', { event, index });
            setSelected(selected === index ? undefined : index);
          }
        }}
        onFocus={(_, index) => {
          setFocused(index);
        }}
        onBlur={() => setFocused(undefined)}
      />
    </>
  );
}

export default DemoInteractionTab;
