# 8.2.0

- Decrease bundle size of about 2%

# 8.1.0

- Widen peerDependencies to include React 17

# 8.0.1

### Bugfixes

- Change `extractPercentage` implementation to address a rounding issue in `stroke-dashoffset` evaluation (#133)

# 8.0.0

### Breaking Changes

- Chart component exposed as named export instead of default.
- Minimum `react` and `react-dom` peerDependency versions increased to `^16.8.0`
- Minimum `typescript` version increased to `^3.8.0` (due to `import type`)
- `label` prop works as [render prop](https://reactjs.org/docs/render-props.html); drop support for `boolean` and Element values
- `segmentsShift` prop expressed as absolute `viewBox` units instead of radius' percentage
- Event handlers signature updated to: `(event, segmentIndex) => void`
- `rx` and `ry` props replaced by `center` array prop
- `center` and `radius` props expressed as absolute `viewBox` units instead of percentage of it
- `prop-types` dependency and static `PropTypes` declarations dropped
- Dropped support for `data[].style property
- Replaced extendedData startOffset prop with startAngle
- `injectSVG` dropped in favour of native children prop
- requestAnimationFrame existence check removed
- Removed `Object.assign` polyfill

### New Features

- Gzipped size reduced from 2.6kb to 1.9 kb (-27%)
- `segmentsStyle` and `labelStyle` accept both value or function

### Bugfixes

- Default labels vertically aligned with `dominant-baseline: central` (#149)

### How to migrate to version 8.0.0

- Update import declaration to: `import {PieChart} from 'react-minimal-pie-chart'`
- Make sure that installed `react` and `react-dom` version is >= `16.8.0`
- In case `typescript` is used, ensure that installed version is >= `3.8`
- Migrate `label` prop to provide a render function (see docs about labels)
- Replace existing `rx` `ry` props with `center`
- Review existing `center` and `segmentsShift` values (now expressed as `viewBox` values)
- Update `onBlur`, `onClick`, `onFocus`, `onKeyDown`, `onMouseOut`, `onMouseOver`, `segmentsShift` function props to new signatures
- Move existing `injectSVG` prop return value to `children` prop
- Use `segmentsStyle` as function instead of `data[].style` prop
- Mind that the root element is now the SVG itself
- Provide an [`Object.assign` polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill) to support legacy browser (eg. IE)

# 7.3.1

### Bugfixes

- Fix event handler types expecting wrong event as first argument
- Fix `label` prop type declaration when receiving a function (#154)
- Fix wrong label position when segmentsShift enabled (#155)

# 7.3.0

### New Features

- Allow `segmentsShift` as function to return `undefined`

### Minor Changes

- Improve `sumValues` performance

# 7.2.0

### New Features

- Add `segmentsShift` prop to move segments radially and render exploded charts

# 7.1.1

### Bugfixes

- Fix regression introduced in `7.1.0` consisting of `reveal` prop being stuck after initial animation

# 7.1.0

### New Features

- Add `onBlur`, `onFocus`, `onKeyDown` callbacks
- Add `segmentsTabIndex` to append a `tabindex` prop to segment paths

### Bugfixes

- Fix regression bug consisting of `stroke-dasharray` and `stroke-dashoffset` attributes being evaluated and appended even when there is no animation

# 7.0.0

### Warning

This release introduced a regression bug. Please upgrade to `V7.1.0`

### Breaking Changes

- Remove `src` from distribution
- `EventHandler` expects `void` as return type

### Minor Changes

- Introduce Typescript natively
- Remove `prop-types` from private components

# 6.0.1

### Bugfixes

- Fix chart `cy` being evaluated from `viewBoxSize` width instead of height

# 6.0.0

### Breaking Changes

- `ratio` property removed in favour of `viewBoxSize`

# 5.0.2

### Bugfixes

- fix `NaN` being rendered as SVG path attribute when `data.value` sum equals 0 and `totalValue` is undefined

# 5.0.1

### Bugfixes

- fix `reveal` direction with negative `lengthAngle`

# 5.0.0

### Breaking Changes

- `reveal` works same direction as `lengthAngle`
- Labels vertically aligned using `dominant-baseline` instead of `alignment-baseline`

# 4.2.0

### New Features

- Add `background` prop to draw segment's background

### Bugfixes

- Fix `props.data` types

# 4.1.1

### Bugfixes

- Transpile bundled `svg-partial-circle`

# 4.1.0

### New Features

- Provide custom segment style via `props.data[i].style`

# 4.0.0

### Breaking Changes

- `ReactMinimalPieChart` extends `React.Component` instead of `React.PureComponent`
- Improve `paddingAngle` implementation to respect the proportions between rendered slices
- Add TypeScript types

### Minor Changes

- Compile with Babel v7
- Update Storybook demo to v5
- Add `sideEffect` flag

### Bugfixes

- Replace `export { default } from` syntax not supported by TS

# 3.5.0

- Add support for labels with props: `label`, `labelPosition` and `labelStyle`
- Minor internal refactoring

# 3.4.1

- Fix chart to render `data.title` value as `<title>` inside `<path>` element

# 3.4.0

- Support `injectSvg` function property to inject any element into rendered `<svg>` element

# 3.3.0

- Support `data.title` property to render `<title>` inside `<path>` element

# 3.2.0

- Add UMD export

# 3.1.0

- Add segments interaction callbacks: `onClick`, `onMouseOver`, `onMouseOut`
- Add `segmentsStyle` prop
- Setup up Prettier

# 3.0.2

- Prevent initial animation when component is unmounted

# 3.0.1

- Update `react`/`react-dom` peer dependency version to accept versions `15` and `16`

# 3.0.0

- Make SVG element `display: block` to remove undesired spacing

# 2.0.0

- Compile with Rollup.js to bundle with a transpiled version of `svg-partial-circle v0.2.0`

# 1.1.0

- Migrate React's prop types to external `prop-types` package
- Swap `react-addons-test-utils` with `react-test-renderer` as `enzyme` required dependencies

# 1.0.0

- Enable negative `lengthAngle` to configure clockwise and counterclockwise charts
- Add `rx` and `ry` props to set custom chart center coordinates
- Add `ratio` prop
- Add `radius` prop
- Re-evaluate segments size when `paddingAngle` is > 0
- Make counterclockwise charts by default
- Make <ReactMinimalPieChart> a pure component
- Add eslint parsing

# 0.0.2

- Incorporate `svg-partial-circle` lib

# 0.0.1

- Fix bad imports

# 0.0.0

- Initial release
