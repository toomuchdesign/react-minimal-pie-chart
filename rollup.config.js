// https://github.com/rollup/rollup-starter-project
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babelrc from 'babelrc-rollup';
import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  resolve({
    // Resolve and include "svg-partial-circle" package only
    jail: __dirname + '/node_modules/svg-partial-circle',
  }),
  commonjs({
    // https://github.com/reactjs/react-redux/issues/643#issuecomment-285008041
    namedExports: {
      'node_modules/react/react.js': ['PureComponent'],
    },
  }),
  babel(babelrc()),
];

export default {
  entry: 'src/index.js',
  plugins: plugins,
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: 'cjs',
      sourceMap: true,
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true,
    },
  ],
};
