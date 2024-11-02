import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

let pkg = require('./package.json');
let external = []
  // Mark dependencies and peerDependencies as external
  .concat(Object.keys(pkg.peerDependencies));
const extensions = ['.js', '.ts', '.tsx'];

let plugins = [
  nodeResolve({
    extensions,
  }),
  babel({
    extensions,
    babelHelpers: 'bundled',
  }),
  commonjs(),
];

export default {
  input: 'src/index.ts',
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
    {
      file: 'dist/index.js',
      format: 'umd',
      sourcemap: true,
      exports: 'named',
      name: 'ReactMinimalPieChart',
      globals: {
        react: 'React',
      },
    },
  ],
};
