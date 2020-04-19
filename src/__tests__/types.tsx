import React from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import PieChart from '../../src';
import type { Props as PieChartProps } from '../../src/Chart';
type Data = PieChartProps['data'];

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

<PieChart
  data={[]}
  onBlur={(e: FocusEvent, data: Data, index: number) => {}}
  onClick={(e: MouseEvent, data: Data, index: number) => {}}
  onFocus={(e: FocusEvent, data: Data, index: number) => {}}
  onKeyDown={(e: KeyboardEvent, data: Data, index: number) => {}}
  onMouseOut={(e: MouseEvent, data: Data, index: number) => {}}
  onMouseOver={(e: MouseEvent, data: Data, index: number) => {}}
/>;

<PieChart data={[]}>1</PieChart>;
<PieChart data={[]}>'string'</PieChart>;
<PieChart data={[]}>
  <div />
</PieChart>;
