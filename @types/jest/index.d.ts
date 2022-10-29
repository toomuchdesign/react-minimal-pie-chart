declare global {
  namespace jest {
    interface Expect {
      toEqualWithRoundingError(expected: number): any;
    }
    interface Matchers<R = void> {
      toEqualWithRoundingError(expected: number): R;
    }
  }
}

export {};
