import React from 'react';
import PieChart from '../../src';

<PieChart data={[]} />;
<PieChart
  data={[
    { value: 10, color: 'blue' },
    { value: 15, color: 'orange' },
  ]}
  animate={true}
  animationDuration={1}
  animationEasing={'string'}
  background={'string'}
  className={'string'}
  cx={1}
  cy={1}
  injectSvg={() => <text />}
  labelPosition={1}
  labelStyle={{ color: 'red' }}
  lengthAngle={1}
  lineWidth={1}
  paddingAngle={1}
  radius={1}
  reveal={1}
  rounded={true}
  segmentsStyle={{ color: 'red' }}
  segmentsTabIndex={1}
  startAngle={1}
  style={{ color: 'red' }}
  totalValue={1}
  viewBoxSize={[1, 1]}
/>;

<PieChart data={[]} label />;
<PieChart data={[]} label={false} />;
<PieChart data={[]} label={() => 1} />;
<PieChart data={[]} label={() => 'string'} />;
<PieChart data={[]} label={() => <text />} />;
<PieChart data={[]} label={<text />} />;

<PieChart data={[]} segmentsShift={1} />;
<PieChart data={[]} segmentsShift={() => 1} />;
<PieChart data={[]} segmentsShift={() => undefined} />;
//@ts-ignore
<PieChart data={[]} segmentsShift={() => {}} />;

//@TODO update with actual event type
<PieChart
  data={[]}
  onBlur={(e) => {}}
  onClick={(e) => {}}
  onFocus={(e) => {}}
  onKeyDown={(e) => {}}
  onMouseOut={(e) => {}}
  onMouseOver={(e) => {}}
/>;

<PieChart data={[]}>1</PieChart>;
<PieChart data={[]}>'string'</PieChart>;
<PieChart data={[]}>
  <div />
</PieChart>;
