# React minimal pie chart

[![Build Status][ci-badge]][ci]
[![Npm version][npm-version-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![Bundle size][bundlephobia-badge]][bundlephobia]

Lightweight React **SVG pie charts**, with **versatile options** and **CSS animation** included. **< 3kB** gzipped. [👏 Demo 👏][storybook].

<p align="center">
  <img
    width="350px"
    src="docs/chart.gif?raw=true"
    alt="React minimal pie chart preview"
  />
</p>

## Why?

Because [Recharts][recharts-github] is awesome, but when you just need a simple pie/donought chart, **3kB** are usually enough.

|                                                        |                                         Size<br>by Bundlefobia                                          | Benchmark Size \* | Loading time<br>on a slow 3g \* |
| :----------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :---------------: | :-----------------------------: |
|           react-minimal-pie-chart (_v7.3.1_)           |               [![Bundle size: React minimal pie chart][bundlephobia-badge]][bundlephobia]               |      2.6 KB       |             ~53 ms              |
|         [rechart][recharts-github] (_v1.8.5_)          |             [![Bundle size: Recharts][recharts-bundlephobia-badge]][recharts-bundlephobia]              |       97 KB       |            ~1900 ms             |
|     [victory-pie][victory-pie-github] (_v34.1.3_)      |         [![Bundle size: Victory pie][victory-pie-bundlephobia-badge]][victory-pie-bundlephobia]         |      50.5 KB      |            ~1100 ms             |
| [react-apexcharts][react-apexcharts-github] (_v1.3.7_) | [![Bundle size: React apec charts][react-apexcharts-bundlephobia-badge]][react-apexcharts-bundlephobia] |     114.7 KB      |            ~2300 ms             |
|       [react-vis][react-vis-github] (_v1.11.7_)        |            [![Bundle size: React vis][react-vis-bundlephobia-badge]][react-vis-bundlephobia]            |      78.4 KB      |            ~1600 ms             |

\* Benchmark carried out with [size-limit](https://github.com/ai/size-limit) with a "real-world" setup: see [benchmark repo](https://github.com/toomuchdesign/react-pie-charts-size). (What matter here are not absolute values but the relation between magnitudes)

## Features

- **< 3kB** gzipped
- Versatile: **Pie**, **Donut**, **Loading**, **Completion** charts (see [Demo][storybook])
- Customizable chart **labels** and **CSS animations**
- Written in **Typescript**
- No dependencies

## Installation

```console
npm install react-minimal-pie-chart
```

If you don't use a package manager, `react-minimal-pie-chart` exposes also an `UMD` module ready for the browser.

```
https://unpkg.com/react-minimal-pie-chart/dist/index.js
```

## Usage

```js
import { PieChart } from 'react-minimal-pie-chart';

<PieChart
  data={[
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]}
/>;
```

## Options

<!-- prettier-ignore-start -->
| Property              | Type                                  | Description                                                                                                                                                                                                                                                                               | Default    |
| --------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **data** _(required)_ | _Array_                               | Source data which each element is a segment                                                                                                                                                                                                                                               | -          |
| **lineWidth**         | _Number_ (%)                          | Line width of each segment. Percentage of chart's radio _(100 === full pie)_                                                                                                                                                                                                              | 100        |
| **startAngle**        | _Number_                              | Start angle of first segment                                                                                                                                                                                                                                                              | 0          |
| **lengthAngle**       | _Number_                              | Total angle taken by the chart _(can be negative to make the chart clockwise!)_                                                                                                                                                                                                           | 360        |
| **totalValue**        | _Number_                              | Total value represented by the full chart                                                                                                                                                                                                                                                 | -          |
| **paddingAngle**      | _Number_                              | Angle between two segments                                                                                                                                                                                                                                                                | -          |
| **rounded**           | _Bool_                                | Round line caps of each segment                                                                                                                                                                                                                                                           | -      |
| **segmentsShift**     | _Number_ (user units), _Function_     | Translates segments radially. If `number` set, provide shift value relative to `viewBoxSize` space. If `function`, return a value for each segment: `(segmentIndex) => number \| undefined` </br>(`radius` prop might be adjusted to prevent segments from overflowing chart's boundaries) | -          |
| **segmentsStyle**     | _Object_, _Function_                  | Style object assigned to each segment. If `function` set, return a value for each segment `(segmentIndex) => {} \| undefined`                                                                                                                                                            | -          |
| **segmentsTabIndex**  | _Number_                              | [`tabindex` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/tabindex) assigned to segments                                                                                                                                                                          | -          |
| **label**             | _Function_                            | A function returning the value or element rendered as label: `(labelRenderProps: LabelRenderProps) => string \| number \| ReactElement \| undefined \| null`                                                                                                                                         | -      |
| **labelPosition**     | _Number_ (%)                          | Label position from origin. Percentage of chart's radio _(50 === middle point)_                                                                                                                                                                                                           | 50         |
| **labelStyle**        | _Object_, _Function_                  | Style object assigned to each label. If `function` set, return a value for each label `(segmentIndex) => {} \| undefined`                                                                                                                                                             | -          |
| **animate**           | _Bool_                                | Animate segments on component mount                                                                                                                                                                                                                                                       | -      |
| **animationDuration** | _Number_                              | Animation duration in ms                                                                                                                                                                                                                                                                  | 500        |
| **animationEasing**   | _String_                              | A [CSS easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                                                                                                                                                                                      | "ease-out" |
| **reveal**            | _Number_ (%)                          | Turn on CSS animation and reveal just a percentage of each segment                                                                                                                                                                                                                        | -          |
| **background**        | _String_                              | Segments' background color                                                                                                                                                                                                                                                                | -          |
| **children**          | _ReactElement_ (svg)               | Elements rendered as children of SVG element (eg. SVG `defs` and gradient elements)                                                                                                                                                                                               | -          |
| **radius**            | _Number_ (user units)                 | Radius of the pie (relative to `viewBoxSize` space)                                                                                                                                                                                                                                       | 50         |
| **center**            | _Array of Numbers_                 | x and y coordinates of center (relative to `viewBoxSize` space)                                                                                                                                                                                                                                  | [50, 50]         |
| **viewBoxSize**       | _Array of Numbers_                    | `width` and `height` of SVG `viewBox` attribute                                                                                                                                                                                                                                           | [100, 100] |
| **onBlur**            | _Function_                            | `onBlur` event handler for each segment: `(event, segmentIndex) => void`                                                                                                                                                                                                                  | -          |
| **onClick**           | _Function_                            | `onClick` event handler for each segment: `(event, segmentIndex) => void`                                                                                                                                                                                                                 | -          |
| **onFocus**           | _Function_                            | `onFocus` event handler for each segment: `(event, segmentIndex) => void`                                                                                                                                                                                                                 | -          |
| **onKeyDown**         | _Function_                            | `onKeyDown` event handler for each segment: `(event, segmentIndex) => void`                                                                                                                                                                                                               | -          |
| **onMouseOut**        | _Function_                            | `onMouseOut` event handler for each segment: `(event, segmentIndex) => void`                                                                                                                                                                                                              | -          |
| **onMouseOver**       | _Function_                            | `onMouseOver` event handler for each segment: `(event, segmentIndex) => void`                                                                                                                                                                                                             | -          |
<!-- prettier-ignore-end -->

### About `props.data`

`props.data` expects the following array of entries:

```typescript
type Data = {
  color: string;
  value: number;
  key?: string | number;
  title?: string | number;
  [key: string]: any;
}[];
```

Each entry accepts the following **optional properties**:

- **`key`**: custom value to be used as [segments element keys](https://reactjs.org/docs/lists-and-keys.html)

- **`title`**: [`title` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title) rendered as segment's child

### Custom labels with `label` prop

`label` is a function property that gets called with `dataIndex` and `labelRenderProps` as **arguments**. It's return value represents the **string, number or element** to be rendered as label.

```js
<PieChart
  label={(labelRenderProps: LabelRenderProps) =>
    number | string | React.ReactElement | undefined | null
  }
/>
```

```typescript
type LabelRenderProps = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  // props.data entry relative to the label extended with:
  dataEntry: {
    startAngle: number;
    degrees: number;
    percentage: number;
  };
  dataIndex: number;
  style: React.CSSProperties;
};
```

See some examples in the [demo source][demo-label-source].

## How to

### User interactions with the chart

See [demo][demo-interaction] and relative source [here][demo-interaction-source] and [here][demo-interaction-2-source].

## Browsers support

Here is an updated [browsers support list 🔍](https://github.com/toomuchdesign/react-minimal-pie-chart/issues/129).

The main requirement of this library is an accurate rendering of [SVG Stroke properties](https://www.w3schools.com/graphics/svg_stroking.asp).

Please consider that a [`Math.sign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) polyfill is needed to support legacy browsers.

## Misc

### How svg arc paths work?

- http://xahlee.info/js/svg_circle_arc.html
- https://codepen.io/lingtalfi/pen/yaLWJG

<!-- http://users.ecs.soton.ac.uk/rfp07r/interactive-svg-examples/  -->

### How SVG animations work?

This library uses the `stroke-dasharray` + `stroke-dashoffset` animation strategy [described here](https://css-tricks.com/svg-line-animation-works/).

## Todo's

- Consider moving storybook deployment to CI
- Add `.browserslistrc` to get rid of some Babel helpers
- Consider using `transform` to mutate segments/labels positions

## Contributors

Thanks to you all ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.andreacarraro.it"><img src="https://avatars3.githubusercontent.com/u/4573549?v=4" width="100px;" alt=""/><br /><sub><b>Andrea Carraro</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign" title="Code">💻</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign" title="Documentation">📖</a> <a href="#infra-toomuchdesign" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign" title="Tests">⚠️</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/pulls?q=is%3Apr+reviewed-by%3Atoomuchdesign" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/rufman"><img src="https://avatars3.githubusercontent.com/u/1128559?v=4" width="100px;" alt=""/><br /><sub><b>Stephane Rufer</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Arufman" title="Bug reports">🐛</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=rufman" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jaaberg"><img src="https://avatars3.githubusercontent.com/u/1413255?v=4" width="100px;" alt=""/><br /><sub><b>Jørgen Aaberg</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=jaaberg" title="Code">💻</a></td>
    <td align="center"><a href="http://www.tobiahrex.com"><img src="https://avatars3.githubusercontent.com/u/16377119?v=4" width="100px;" alt=""/><br /><sub><b>Tobiah Rex</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3ATobiahRex" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://edwardxiao.com"><img src="https://avatars2.githubusercontent.com/u/11728228?v=4" width="100px;" alt=""/><br /><sub><b>Edward Xiao</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aedwardfhsiao" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://keybase.io/konsumer"><img src="https://avatars1.githubusercontent.com/u/83857?v=4" width="100px;" alt=""/><br /><sub><b>David Konsumer</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=konsumer" title="Code">💻</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=konsumer" title="Documentation">📖</a> <a href="#example-konsumer" title="Examples">💡</a> <a href="#ideas-konsumer" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/nehoraigold"><img src="https://avatars2.githubusercontent.com/u/44398222?v=4" width="100px;" alt=""/><br /><sub><b>Ori</b></sub></a><br /><a href="#ideas-nehoraigold" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.manos.im/"><img src="https://avatars3.githubusercontent.com/u/6333409?v=4" width="100px;" alt=""/><br /><sub><b>Emmanouil Konstantinidis</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Amanosim" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/yuruc"><img src="https://avatars0.githubusercontent.com/u/5884342?v=4" width="100px;" alt=""/><br /><sub><b>yuruc</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=yuruc" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/luca-schiavone-7270a8138/"><img src="https://avatars1.githubusercontent.com/u/16616566?v=4" width="100px;" alt=""/><br /><sub><b>luca-esse </b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aluca-esse" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://twitter.com/Osuka42"><img src="https://avatars1.githubusercontent.com/u/5117006?v=4" width="100px;" alt=""/><br /><sub><b>Oscar Mendoza</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3AOsuka42g" title="Bug reports">🐛</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=Osuka42g" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/damien-git"><img src="https://avatars0.githubusercontent.com/u/7503971?v=4" width="100px;" alt=""/><br /><sub><b>damien-git</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Adamien-git" title="Bug reports">🐛</a> <a href="#ideas-damien-git" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/vianneystroebel/"><img src="https://avatars0.githubusercontent.com/u/628818?v=4" width="100px;" alt=""/><br /><sub><b>Vianney Stroebel</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Avibl" title="Bug reports">🐛</a> <a href="#ideas-vibl" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://xumi.fr"><img src="https://avatars0.githubusercontent.com/u/204001?v=4" width="100px;" alt=""/><br /><sub><b>Maxime Zielony</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Axumi" title="Bug reports">🐛</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=xumi" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/razked"><img src="https://avatars0.githubusercontent.com/u/39411034?v=4" width="100px;" alt=""/><br /><sub><b>Raz Kedem</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Arazked" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/slumbering"><img src="https://avatars2.githubusercontent.com/u/1186424?v=4" width="100px;" alt=""/><br /><sub><b>Blocksmith</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aslumbering" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://jamietalbot.com"><img src="https://avatars0.githubusercontent.com/u/425787?v=4" width="100px;" alt=""/><br /><sub><b>Jamie Talbot</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Amajelbstoat" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[ci-badge]: https://travis-ci.org/toomuchdesign/react-minimal-pie-chart.svg?branch=master
[ci]: https://travis-ci.org/toomuchdesign/react-minimal-pie-chart
[coveralls-badge]: https://coveralls.io/repos/github/toomuchdesign/react-minimal-pie-chart/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/toomuchdesign/react-minimal-pie-chart?branch=master
[npm]: https://www.npmjs.com/package/react-minimal-pie-chart
[npm-version-badge]: https://img.shields.io/npm/v/react-minimal-pie-chart.svg
[bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/react-minimal-pie-chart
[bundlephobia]: https://bundlephobia.com/result?p=react-minimal-pie-chart
[recharts-bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/recharts
[recharts-bundlephobia]: https://bundlephobia.com/result?p=recharts
[recharts-github]: https://github.com/recharts/recharts
[victory-pie-bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/victory-pie
[victory-pie-bundlephobia]: https://bundlephobia.com/result?p=victory-pie
[victory-pie-github]: https://github.com/FormidableLabs/victory
[react-apexcharts-bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/apexcharts
[react-apexcharts-bundlephobia]: https://bundlephobia.com/result?p=apexcharts
[react-apexcharts-github]: https://github.com/apexcharts/apexcharts.js
[react-vis-bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/react-vis
[react-vis-bundlephobia]: https://bundlephobia.com/result?p=react-vis
[react-vis-github]: https://github.com/uber/react-vis
[storybook]: https://toomuchdesign.github.io/react-minimal-pie-chart/index.html
[demo-interaction]: https://toomuchdesign.github.io/react-minimal-pie-chart/index.html?path=/story/interaction--click-mouseover-mouseout-callbacks
[demo-interaction-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/v7.1.1/stories/InteractionStory.js
[demo-interaction-2-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/v7.1.1/stories/InteractionTabStory.js
[demo-label-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/v7.1.1/stories/index.js#L67
