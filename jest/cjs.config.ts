import config from '../jest.config';

module.exports = Object.assign({}, config, {
  rootDir: '../',
  moduleNameMapper: {
    '/src$': '<rootDir>/dist/index.cjs.js',
  },
});
