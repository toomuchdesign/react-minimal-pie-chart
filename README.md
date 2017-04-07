# React minimal pie chart [![Build Status][ci-img]][ci]
Lightweight React **SVG pie charts**, with **versatile options** and **CSS animation** included. 👏 &nbsp;[Demo][storybook]&nbsp;👏.

[ci-img]:                       https://travis-ci.org/toomuchdesign/react-minimal-pie-chart.svg
[ci]:                           https://travis-ci.org/toomuchdesign/react-minimal-pie-chart
[storybook]:                    https://f4442c1e-0562-45ed-89e9-34b069224803.sbook.io

```js
import PieChart from 'react-minimal-pie-chart';

<PieChart
  data={[
    { value: 10, key: 1, color: '#E38627' },
    { value: 15, key: 2, color: '#C13C37' },
    { value: 20, key: 3, color: '#6A2135' },
  ]}
/>
```

## Installation
```console
npm install react-minimal-pie-chart
```

## Why?
Because [Recharts](https://github.com/recharts/recharts) is awesome, but when you need just a simple pie/donought chart, few line of code are usually enough.

## Features
- No dependencies
- Customizable CSS animations trough [stroke-dasharray + stroke-dashoffset strategy](https://css-tricks.com/svg-line-animation-works/)
- Configurable: Pie, Donut, Loading, Completion charts (see [Demo][storybook])

## Options
Property | Type | Description | Default
----- | ----- | ----- | -----
**data** *(required)* | *Array* | The source data which each element is a segment. | -
**cx** | *Number* | The x-coordinate of center. The value is the percentage of the component width | 50
**cy** | *Number* | The y-coordinate of center. The value is the percentage of the component height | 50
**ratio** | *Number* | The ratio of rendered svg element | 1
**startAngle** | *Number* | The start angle of first sector | 0
**lengthAngle** | *Number* | The total angle taken by the chart *(can be negative to make the chart clockwise!)* | 360
**totalValue** | *Number* | The total value represented by the full chart | -
**lineWidth** | *Number* | The width of the line representing each sector. The value is the percentage of chart radio*(100 === full pie)* | 100
**radius** | *Number* | The radius of the pie. The value is the percentage of the component width * | 50
**paddingAngle** | *Number* | The angle between two sectors| -
**rounded** | *Bool* | Round line caps of each sector| false
**style** | *Object* | The style object assigned to chart wrapper | -
**animate** | *Bool* | Animate sectors on component mount| false
**animationDuration** | *Number* | Animation duration in ms | 500
**animationEasing** | *String* | Animation CSS easing | "ease-out"
**reveal** | *Number* | Turn on CSS animation and reveal just a percentage of each segment| -

## Misc
### How svg arc paths work?
http://users.ecs.soton.ac.uk/rfp07r/interactive-svg-examples/

## Todo's
- Find a better solution for padding evaluation
- Make a device/browser compatibility table
- Define a className targeting each segment path for custom CSS animations
- Background segment
- Fix/extend [svg-partial-circle](https://github.com/derhuerst/svg-partial-circle)
