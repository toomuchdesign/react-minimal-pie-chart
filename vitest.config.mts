import { defineConfig, defaultInclude } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'test',
    setupFiles: ['vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      enabled: true,
      reporter: [['lcov', { projectRoot: './' }], ['text']],
    },
    environment: 'jsdom',
    typecheck: {
      enabled: true,
      include: defaultInclude,
    },
  },
});
