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
