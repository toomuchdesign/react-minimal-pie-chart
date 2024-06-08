import '@testing-library/jest-dom';

// https://stackoverflow.com/a/53464807/2902821
expect.extend({
  toEqualWithRoundingError(actual: number, expected: number, decimals = 12) {
    const pass = Math.abs(expected - actual) < Math.pow(10, -decimals) / 2;
    if (pass) {
      return {
        message: () =>
          `expected ${actual} not to equal ${expected} (with ${decimals} decimals rounding error)`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${actual} to equal ${expected} (with ${decimals} decimals rounding error)`,
        pass: false,
      };
    }
  },
});
