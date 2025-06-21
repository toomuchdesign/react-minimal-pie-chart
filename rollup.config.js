import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const external = []
  // Mark dependencies and peerDependencies as external
  .concat(Object.keys(pkg.dependencies), Object.keys(pkg.peerDependencies));

const plugins = [
  typescript({
    compilerOptions: {
      declaration: true,
      declarationDir: 'dist',
    },
    include: ['src/**'],
  }),
];

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  plugins: plugins,
  external,
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
};
