// https://github.com/rollup/rollup-starter-project
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');
let external = []
  // Mark dependencies and peerDependencies as external
  .concat(Object.keys(pkg.dependencies), Object.keys(pkg.peerDependencies))
  // ...But bundle svg-partial-circle into the package
  .filter(pkgName => pkgName !== 'svg-partial-circle');

let plugins = [
  resolve(),
  babel(),
  commonjs({
    // https://github.com/reactjs/react-redux/issues/643#issuecomment-285008041
    namedExports: {
      'node_modules/react/react.js': ['PureComponent'],
    },
  }),
];

export default {
  input: 'src/index.js',
  plugins: plugins,
  external: external,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
};
