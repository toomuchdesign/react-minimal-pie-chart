# React minimal pie chart [![Build Status][ci-img]][ci]
Lightweight React **SVG pie charts**, with **versatile options** and **CSS animation** included. 👏 &nbsp;[Demo][storybook]&nbsp;👏.

[ci-img]:                       https://travis-ci.org/toomuchdesign/react-minimal-pie-chart.svg
[ci]:                           https://travis-ci.org/toomuchdesign/react-minimal-pie-chart
[storybook]:                    http://www.andreacarraro.it/react-minimal-pie-chart

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
- No dependencies (except for [React's prop-types](https://github.com/reactjs/prop-types))
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
- Find a better `paddingAngle` implementation
- Make a device/browser compatibility table
- Define a className targeting each segment path for custom CSS animations
- Background segment
- Add `babel-eslint`?
- Add UMD export?

## Contributors
Thanks to you all ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/4573549?v=4" width="100px;"/><br /><sub>Andrea Carraro</sub>](http://www.andreacarraro.it)<br />[💻](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign "Code") [📖](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign "Documentation") [🚇](#infra-toomuchdesign "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign "Tests") [👀](#review-toomuchdesign "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/1128559?v=4" width="100px;"/><br /><sub>Stephane Rufer</sub>](https://github.com/rufman)<br />[🐛](https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Arufman "Bug reports") [💻](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=rufman "Code") | [<img src="https://avatars3.githubusercontent.com/u/1413255?v=4" width="100px;"/><br /><sub>Jørgen Aaberg</sub>](https://github.com/jaaberg)<br />[💻](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=jaaberg "Code") | [<img src="https://avatars3.githubusercontent.com/u/16377119?v=4" width="100px;"/><br /><sub>Tobiah Rex</sub>](http://www.tobiahrex.com)<br />[🐛](https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3ATobiahRex "Bug reports") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
