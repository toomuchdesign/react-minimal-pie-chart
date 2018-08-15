# React minimal pie chart

[![Build Status][ci-img]][ci]
[![Coveralls][coveralls-badge]][coveralls]

Lightweight React **SVG pie charts**, with **versatile options** and **CSS animation** included. 👏 &nbsp;[Demo][storybook]&nbsp;👏.

```js
import PieChart from 'react-minimal-pie-chart';

<PieChart
  data={[
    { value: 10, color: '#E38627' },
    { value: 15, color: '#C13C37' },
    { value: 20, color: '#6A2135' },
  ]}
/>;
```

## Installation

```console
npm install react-minimal-pie-chart
```

If you don't use a package manager, `react-minimal-pie-chart` exposes also an `ÙMD` module ready for the browser.

```
https://unpkg.com/react-minimal-pie-chart/umd/index.js
```

## Why?

Because [Recharts](https://github.com/recharts/recharts) is awesome, but when you just need a simple pie/donought chart, a few lines of code are usually enough.

## Features

- No dependencies (except for [React's prop-types](https://github.com/reactjs/prop-types))
- Customizable CSS animations with [stroke-dasharray + stroke-dashoffset strategy](https://css-tricks.com/svg-line-animation-works/)
- Configurable: Pie, Donut, Loading, Completion charts (see [Demo][storybook])

## Options

| Property              | Type       | Description                                                                                                     | Default    |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------- | ---------- |
| **data** _(required)_ | _Array_    | The source data which each element is a segment.                                                                | -          |
| **cx**                | _Number_   | The x-coordinate of center. The value is the percentage of the component width                                  | 50         |
| **cy**                | _Number_   | The y-coordinate of center. The value is the percentage of the component height                                 | 50         |
| **ratio**             | _Number_   | The ratio of rendered svg element                                                                               | 1          |
| **startAngle**        | _Number_   | The start angle of first sector                                                                                 | 0          |
| **lengthAngle**       | _Number_   | The total angle taken by the chart _(can be negative to make the chart clockwise!)_                             | 360        |
| **totalValue**        | _Number_   | The total value represented by the full chart                                                                   | -          |
| **lineWidth**         | _Number_   | The width of the line representing each sector. The value is the percentage of chart radio _(100 === full pie)_ | 100        |
| **radius**            | _Number_   | The radius of the pie. The value is the percentage of the component width \*                                    | 50         |
| **paddingAngle**      | _Number_   | The angle between two sectors                                                                                   | -          |
| **rounded**           | _Bool_     | Round line caps of each sector                                                                                  | false      |
| **segmentsStyle**     | _Object_   | Style object assigned each segments                                                                             | -          |
| **animate**           | _Bool_     | Animate sectors on component mount                                                                              | false      |
| **animationDuration** | _Number_   | Animation duration in ms                                                                                        | 500        |
| **animationEasing**   | _String_   | Animation CSS easing                                                                                            | "ease-out" |
| **reveal**            | _Number_   | Turn on CSS animation and reveal just a percentage of each segment                                              | -          |
| **onClick**           | _Function_ | Custom event handler of `onClick` on each sector : `(event, data, dataIndex) => {}`                             | -          |
| **onMouseOver**       | _Function_ | Custom event handler of `onMouseOver` on each sector : `(event, data, dataIndex) => {}`                         | -          |
| **onMouseOut**        | _Function_ | Custom event handler of `onMouseOut` on each sector : `(event, data, dataIndex) => {}`                          | -          |

Each **data** entry can also accept an **optional [`key` property](https://reactjs.org/docs/lists-and-keys.html)** just in case items' indexes weren't enough:

```js
{ value: 10, key: 1, color: '#E38627' }
```

## How to

### User interactions with the chart

See [demo][demo-interaction] and its [source][demo-interaction-source].

## Browsers support

The main requirement of this library is an accurate rendering of [SVG Stroke properties](https://www.w3schools.com/graphics/svg_stroking.asp).

### Not supported

- IE ≤ 10

### Partially supported

- IE 11

## Misc

### How svg arc paths work?

http://users.ecs.soton.ac.uk/rfp07r/interactive-svg-examples/

## Todo's

- Find a better `paddingAngle` implementation
- Make a device/browser compatibility table
- Background segment

## Contributors

Thanks to you all ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/4573549?v=4" width="100px;"/><br /><sub><b>Andrea Carraro</b></sub>](http://www.andreacarraro.it)<br />[💻](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign "Code") [📖](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign "Documentation") [🚇](#infra-toomuchdesign "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign "Tests") [👀](#review-toomuchdesign "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/1128559?v=4" width="100px;"/><br /><sub><b>Stephane Rufer</b></sub>](https://github.com/rufman)<br />[🐛](https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Arufman "Bug reports") [💻](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=rufman "Code") | [<img src="https://avatars3.githubusercontent.com/u/1413255?v=4" width="100px;"/><br /><sub><b>Jørgen Aaberg</b></sub>](https://github.com/jaaberg)<br />[💻](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=jaaberg "Code") | [<img src="https://avatars3.githubusercontent.com/u/16377119?v=4" width="100px;"/><br /><sub><b>Tobiah Rex</b></sub>](http://www.tobiahrex.com)<br />[🐛](https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3ATobiahRex "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/11728228?v=4" width="100px;"/><br /><sub><b>Edward Xiao</b></sub>](https://edwardxiao.com)<br />[🐛](https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aedwardfhsiao "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/83857?v=4" width="100px;"/><br /><sub><b>David Konsumer</b></sub>](https://keybase.io/konsumer)<br />[💻](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=konsumer "Code") [📖](https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=konsumer "Documentation") [💡](#example-konsumer "Examples") [🤔](#ideas-konsumer "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

[ci-img]: https://travis-ci.org/toomuchdesign/react-minimal-pie-chart.svg?branch=master
[ci]: https://travis-ci.org/toomuchdesign/react-minimal-pie-chart
[coveralls-badge]: https://coveralls.io/repos/github/toomuchdesign/react-minimal-pie-chart/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/toomuchdesign/react-minimal-pie-chart?branch=master
[storybook]: http://www.andreacarraro.it/react-minimal-pie-chart
[demo-interaction]: http://www.andreacarraro.it/react-minimal-pie-chart/?selectedKind=React%20minimal%20pie%20chart&selectedStory=Interaction%20using%20click%2FmouseOver%2FmouseOut&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
[demo-interaction-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/v3.1.0/stories/index.js#L25
