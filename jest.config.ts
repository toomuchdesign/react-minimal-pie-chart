import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testEnvironment: 'jsdom',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: ['src/**'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
