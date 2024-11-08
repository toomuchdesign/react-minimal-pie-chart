import { mergeConfig, defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import config from '../vitest.config.mjs';

export default mergeConfig(
  config,
  defineConfig({
    test: {
      alias: [{ find: /.+\/src$/, replacement: resolve('dist/index.esm.js') }],
    },
  })
);
