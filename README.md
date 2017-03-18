# React minimal pie chart [![Build Status][ci-img]][ci]
Lightweight React **SVG pie charts**, with **versatile options** and **CSS animation** included.

[ci-img]:                       https://travis-ci.org/toomuchdesign/react-minimal-pie-chart.svg
[ci]:                           https://travis-ci.org/toomuchdesign/react-minimal-pie-chart

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

## Options
Property | Type | Description | Default
----- | ----- | ----- | -----
**data** *(required)* | *Array* | The source data which each element is a segment. | -
**startAngle** | *Number* | The start angle of first sector | 0
**lengthAngle** | *Number* | The total angle taken by the chart | 360
**totalValue** | *Number* | The total value represented by the full chart | -
**lineWidth** | *Number* | The width of the line representing each sector *(100 === full pie)* | 100
**paddingAngle** | *Number* | The angle between two sectors| -
**rounded** | *Bool* | Round line caps of each sector| false
**style** | *Object* | The style object assigned to chart wrapper | -
**animate** | *Bool* | Animate sectors on component mount| false
**animationDuration** | *Number* | Animation duration in ms | 500
**animationEasing** | *String* | Animation CSS easing | "ease-out"
**reveal** | *Number* | Turn on CSS animation and reveal just a percentage of each segment| -

## Further info

### Dependencies
**Just 1 micro dependency**: [svg partial circle](https://github.com/derhuerst/svg-partial-circle).

### CSS animations
In order to achieve segment animations without heavy DOM recomputations, **RMPC** uses the [stroke-dasharray + stroke-dashoffset strategy](https://css-tricks.com/svg-line-animation-works/).

## Todo's
- Make negative `lengthAngle` render a counterclockwise chart
- Custom `cx` `cy`?
- Make a device/browser compatibility table
- Define a className targeting segment paths for custom CSS animations
