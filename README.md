# React minimal pie chart

[![Build Status][ci-badge]][ci]
[![Npm version][npm-version-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![Bundle size][bundlephobia-badge]][bundlephobia]

Lightweight React **SVG pie charts**, with **versatile options** and **CSS animation** included. **< 2kB** gzipped. [👏 Demo 👏][storybook].

<p align="center">
  <img
    width="350px"
    src="docs/chart.gif?raw=true"
    alt="React minimal pie chart preview"
  />
</p>

## Why?

Because [Recharts][recharts-github] is awesome, but when you just need a simple pie/donought chart, **~~3kB~~ 2kB** are usually enough.

|                                                        |                                         Size<br>by Bundlefobia                                          | Benchmark Size \* | Loading time<br>on a slow 3g \* |
| :----------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :---------------: | :-----------------------------: |
|           react-minimal-pie-chart (_v8.2.0_)           |               [![Bundle size: React minimal pie chart][bundlephobia-badge]][bundlephobia]               |      1.83 KB      |             ~38 ms              |
|         [rechart][recharts-github] (_v1.8.5_)          |             [![Bundle size: Recharts][recharts-bundlephobia-badge]][recharts-bundlephobia]              |      96.9 KB      |            ~1900 ms             |
|     [victory-pie][victory-pie-github] (_v34.1.3_)      |         [![Bundle size: Victory pie][victory-pie-bundlephobia-badge]][victory-pie-bundlephobia]         |      50.5 KB      |            ~1100 ms             |
| [react-apexcharts][react-apexcharts-github] (_v1.3.7_) | [![Bundle size: React apec charts][react-apexcharts-bundlephobia-badge]][react-apexcharts-bundlephobia] |     114.6 KB      |            ~2300 ms             |
|       [react-vis][react-vis-github] (_v1.11.7_)        |            [![Bundle size: React vis][react-vis-bundlephobia-badge]][react-vis-bundlephobia]            |      78.3 KB      |            ~1600 ms             |

\* Benchmark carried out with [size-limit](https://github.com/ai/size-limit) with a "real-world" setup: see [benchmark repo](https://github.com/toomuchdesign/react-pie-charts-size). (What matter here are not absolute values but the relation between magnitudes)

## Features

- **< 2kB** gzipped
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

Minimum supported **Typescript** version: >= `3.8`

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
| [**data**][data-props-docs] | `DataEntry[]`                         | Source data. Each entry represents a chart segment                                                                                                                                                                                                                                               | []          |
| **lineWidth**         | `number` (%)                          | Line width of each segment. Percentage of chart's radius                                                                                                                                                                                                              | 100        |
| **startAngle**        | `number`                              | Start angle of first segment                                                                                                                                                                                                                                                              | 0          |
| **lengthAngle**       | `number`                              | Total angle taken by the chart _(can be negative to make the chart clockwise!)_                                                                                                                                                                                                           | 360        |
| **totalValue**        | `number`                              | Total value represented by the full chart                                                                                                                                                                                                                                                 | -          |
| **paddingAngle**      | `number`                              | Angle between two segments                                                                                                                                                                                                                                                                | -          |
| **rounded**           | `boolean`                                | Round line caps of each segment                                                                                                                                                                                                                                                           | -      |
| **segmentsShift**     | `number`</br>or:</br>`(segmentIndex) => number`     | Translates segments radially. If `number` set, provide shift value relative to `viewBoxSize` space. If `function`, return a value for each segment.</br>_(`radius` prop might be adjusted to prevent segments from overflowing chart's boundaries)_ | -          |
| **segmentsStyle**     | `CSSObject`</br>or:</br>`(segmentIndex) => CSSObject`                  | Style object assigned to each segment. If `function`, return a value for each segment                                                                                                                                                            | -          |
| **segmentsTabIndex**  | `number`                              | [`tabindex` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/tabindex) assigned to segments                                                                                                                                                                          | -          |
| [**label**][label-props-docs] | `(labelRenderProps) => string \| number \| ReactElement` | A function returning a label value or the SVG element to be rendered as label                                                                                                                                          | -      |
| **labelPosition**     | `number` (%)                          | Label position from origin. Percentage of chart's radius _(50 === middle point)_                                                                                                                                                                                                           | 50         |
| **labelStyle**        | `CSSObject`</br>or:</br>`(segmentIndex) => CSSObject`                  | Style object assigned to each label. If `function` set, return style for each label                                                                                                                                                             | -          |
| **animate**           | `boolean`                                | Animate segments on component mount                                                                                                                                                                                                                                                       | -      |
| **animationDuration** | `number`                              | Animation duration in ms                                                                                                                                                                                                                                                                  | 500        |
| **animationEasing**   | `string`                              | A [CSS easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                                                                                                                                                                                      | ease-out |
| **reveal**            | `number` (%)                          | Turn on CSS animation and reveal just a percentage of each segment                                                                                                                                                                                                                        | -          |
| **background**        | `string`                              | Segments' background color                                                                                                                                                                                                                                                                | -          |
| **children**          | `ReactElement` (svg)               | Elements rendered as children of SVG element (eg. SVG `defs` and gradient elements)                                                                                                                                                                                               | -          |
| **radius**            | `number` (user units)                 | Radius of the pie (relative to `viewBoxSize` space)                                                                                                                                                                                                                                       | 50         |
| **center**            | `[number, number]`                 | x and y coordinates of center (relative to `viewBoxSize` space)                                                                                                                                                                                                                                  | [50, 50]         |
| **viewBoxSize**       | `[number, number]`                    | `width` and `height` of SVG `viewBox` attribute                                                                                                                                                                                                                                           | [100, 100] |
| **onBlur**            | `(e, segmentIndex) => void`                            | `onBlur` event handler for each segment                                                                                                                                                                                                                  | -          |
| **onClick**           | `(e, segmentIndex) => void`                            | `onClick` event handler for each segment                                                                                                                                                                                                                 | -          |
| **onFocus**           | `(e, segmentIndex) => void`                            | `onFocus` event handler for each segment                                                                                                                                                                                                                 | -          |
| **onKeyDown**         | `(e, segmentIndex) => void`                            | `onKeyDown` event handler for each segment                                                                                                                                                                                                               | -          |
| **onMouseOut**        | `(e, segmentIndex) => void`                            | `onMouseOut` event handler for each segment                                                                                                                                                                                                              | -          |
| **onMouseOver**       | `(e, segmentIndex) => void`                            | `onMouseOver` event handler for each segment                                                                                                                                                                                                             | -          |
|  | `.oOo.oOo.oOo.oOo.oOo.oOo.oOo.` | | |
<!-- prettier-ignore-end -->

### About `data` prop

`data` prop expects an array of chart entries as follows:

```typescript
type Data = {
  color: string;
  value: number;
  key?: string | number;
  title?: string | number;
  [key: string]: any;
}[];
```

Each entry accepts any custom property plus the following **optional ones**:

- **`key`**: custom value to be used as [segments element keys](https://reactjs.org/docs/lists-and-keys.html)

- **`title`**: [`title` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title) rendered as segment's child

### Custom labels with `label` render prop

`label` prop accepts a function returning the **string, number or element** rendered as label for each segment:

```js
<PieChart
  label={(labelRenderProps: LabelRenderProps) =>
    number | string | React.ReactElement | undefined | null
  }
/>
```

The function receives `labelRenderProps` object as single **argument**:

```typescript
type LabelRenderProps = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  textAnchor: string;
  dataEntry: {
    ...props.data[dataIndex]
    // props.data entry relative to the label extended with:
    startAngle: number;
    degrees: number;
    percentage: number;
  };
  dataIndex: number;
  style: React.CSSProperties;
};
```

#### Label prop, common scenarios

Render entries' values as labels:

```js
label={({ dataEntry }) => dataEntry.value}
```

Render segment's percentage as labels:

```js
label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
```

See examples in the [demo source][demo-label-source].

## How to

### User interactions with the chart

See [demo][demo-interaction] and relative source [here][demo-interaction-source] and [here][demo-interaction-2-source].

### Custom tooltip

See [demo][demo-tooltip] and [relative source][demo-tooltip-source].

## Browsers support

Here is an updated [browsers support list 🔍](https://github.com/toomuchdesign/react-minimal-pie-chart/issues/129).

The main requirement of this library is an accurate rendering of [SVG Stroke properties](https://www.w3schools.com/graphics/svg_stroking.asp).

Please consider that [`Math.sign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) and [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) polyfills are required to support legacy browsers.

## Misc

### How svg arc paths work?

- http://xahlee.info/js/svg_circle_arc.html
- https://codepen.io/lingtalfi/pen/yaLWJG

<!-- http://users.ecs.soton.ac.uk/rfp07r/interactive-svg-examples/  -->

### How SVG animations work?

This library uses the `stroke-dasharray` + `stroke-dashoffset` animation strategy [described here](https://css-tricks.com/svg-line-animation-works/).

## Todo's

- Consider moving storybook deployment to CI
- Consider using `transform` to mutate segments/labels positions
- Consider exposing a reduced chart variation including just a subset of the features
- Consider abstracting React bindings to re-use business logic with other frameworks
- Remove `defaultProps` in favour of JS default arguments
- Provide a way to supply `svg` element with any extra prop
- Consider removing `import type` declaration from generated type definition files (if possible) to ensure Typescript 3.0+ backward compatibility

## Contributors

Thanks to you all ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.andreacarraro.it"><img src="https://avatars3.githubusercontent.com/u/4573549?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrea Carraro</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign" title="Code">💻</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign" title="Documentation">📖</a> <a href="#infra-toomuchdesign" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=toomuchdesign" title="Tests">⚠️</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/pulls?q=is%3Apr+reviewed-by%3Atoomuchdesign" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/rufman"><img src="https://avatars3.githubusercontent.com/u/1128559?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stephane Rufer</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Arufman" title="Bug reports">🐛</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=rufman" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jaaberg"><img src="https://avatars3.githubusercontent.com/u/1413255?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jørgen Aaberg</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=jaaberg" title="Code">💻</a></td>
    <td align="center"><a href="http://www.tobiahrex.com"><img src="https://avatars3.githubusercontent.com/u/16377119?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tobiah Rex</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3ATobiahRex" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://edwardxiao.com"><img src="https://avatars2.githubusercontent.com/u/11728228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Edward Xiao</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aedwardfhsiao" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://keybase.io/konsumer"><img src="https://avatars1.githubusercontent.com/u/83857?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Konsumer</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=konsumer" title="Code">💻</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=konsumer" title="Documentation">📖</a> <a href="#example-konsumer" title="Examples">💡</a> <a href="#ideas-konsumer" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/nehoraigold"><img src="https://avatars2.githubusercontent.com/u/44398222?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ori</b></sub></a><br /><a href="#ideas-nehoraigold" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.manos.im/"><img src="https://avatars3.githubusercontent.com/u/6333409?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Emmanouil Konstantinidis</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Amanosim" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/yuruc"><img src="https://avatars0.githubusercontent.com/u/5884342?v=4?s=100" width="100px;" alt=""/><br /><sub><b>yuruc</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=yuruc" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/luca-schiavone-7270a8138/"><img src="https://avatars1.githubusercontent.com/u/16616566?v=4?s=100" width="100px;" alt=""/><br /><sub><b>luca-esse </b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aluca-esse" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://twitter.com/Osuka42"><img src="https://avatars1.githubusercontent.com/u/5117006?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oscar Mendoza</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3AOsuka42g" title="Bug reports">🐛</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=Osuka42g" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/damien-git"><img src="https://avatars0.githubusercontent.com/u/7503971?v=4?s=100" width="100px;" alt=""/><br /><sub><b>damien-git</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Adamien-git" title="Bug reports">🐛</a> <a href="#ideas-damien-git" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/vianneystroebel/"><img src="https://avatars0.githubusercontent.com/u/628818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vianney Stroebel</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Avibl" title="Bug reports">🐛</a> <a href="#ideas-vibl" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://xumi.fr"><img src="https://avatars0.githubusercontent.com/u/204001?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maxime Zielony</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Axumi" title="Bug reports">🐛</a> <a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=xumi" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/razked"><img src="https://avatars0.githubusercontent.com/u/39411034?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Raz Kedem</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Arazked" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/slumbering"><img src="https://avatars2.githubusercontent.com/u/1186424?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Blocksmith</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aslumbering" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://jamietalbot.com"><img src="https://avatars0.githubusercontent.com/u/425787?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jamie Talbot</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Amajelbstoat" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://timeslikethese.ca"><img src="https://avatars1.githubusercontent.com/u/22269057?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oscar Yixuan Chen</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3Aairoscar" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/RuiRocha1991"><img src="https://avatars2.githubusercontent.com/u/29250466?v=4?s=100" width="100px;" alt=""/><br /><sub><b>RuiRocha1991</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3ARuiRocha1991" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Romaboy"><img src="https://avatars0.githubusercontent.com/u/42248135?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roman Kushyn</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/issues?q=author%3ARomaboy" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://bogas04.github.io/"><img src="https://avatars.githubusercontent.com/u/6177621?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Divjot Singh</b></sub></a><br /><a href="https://github.com/toomuchdesign/react-minimal-pie-chart/commits?author=bogas04" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[ci-badge]: https://travis-ci.com/toomuchdesign/react-minimal-pie-chart.svg?branch=master
[ci]: https://travis-ci.com/toomuchdesign/react-minimal-pie-chart
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
[demo-interaction-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/v8.0.0/stories/InteractionStory.tsx
[demo-interaction-2-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/v8.0.0/stories/InteractionTabStory.tsx
[demo-tooltip]: https://toomuchdesign.github.io/react-minimal-pie-chart/index.html?path=/story/misc--tooltip-integration
[demo-tooltip-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/Tooltip.tsx
[demo-label-source]: https://github.com/toomuchdesign/react-minimal-pie-chart/blob/v8.0.0/stories/index.js#L80
[data-props-docs]: #about-data-prop
[label-props-docs]: #custom-labels-with-label-render-prop
