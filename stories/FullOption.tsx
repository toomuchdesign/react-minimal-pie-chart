import React, { useState } from 'react';
import PieChart from '../src';

function FullOption(props) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  const onMouseOverHandler = (_, __, index) => {
    setHovered(index);
  };

  const onMouseOutHandler = () => {
    setHovered(undefined);
  };

  const onClickHandler = (_, __, index) => {
    setSelected(index === selected ? undefined : index);
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
      onClick={onClickHandler}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
    />
  );
}

export default FullOption;
