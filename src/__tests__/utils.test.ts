import { evaluateLabelTextAnchor } from '../../src/utils';

describe('evaluateLabelTextAnchor util', () => {
  describe('vertically aligned label', () => {
    it('anchor label to "middle"', () => {
      const actual = evaluateLabelTextAnchor({
        lineWidth: 50,
        labelPosition: 80,
        labelHorizontalShift: 0,
      });
      expect(actual).toBe('middle');
    });
  });

  describe('outward label', () => {
    describe('leftward label', () => {
      it('anchor label to end', () => {
        const actual = evaluateLabelTextAnchor({
          labelPosition: 110,
          labelHorizontalShift: -10,
        });
        expect(actual).toBe('end');
      });
    });

    describe('rightward label', () => {
      it('anchor label to start', () => {
        const actual = evaluateLabelTextAnchor({
          labelPosition: 110,
          labelHorizontalShift: 10,
        });
        expect(actual).toBe('start');
      });
    });
  });

  describe('inward label', () => {
    describe('leftward label', () => {
      it('anchor label to start', () => {
        const actual = evaluateLabelTextAnchor({
          lineWidth: 50,
          labelPosition: 20,
          labelHorizontalShift: -10,
        });
        expect(actual).toBe('start');
      });
    });

    describe('rightward label', () => {
      it('anchor label to end', () => {
        const actual = evaluateLabelTextAnchor({
          lineWidth: 50,
          labelPosition: 20,
          labelHorizontalShift: 10,
        });
        expect(actual).toBe('end');
      });
    });
  });

  describe('overlying label', () => {
    it('anchor label to "middle"', () => {
      const actual = evaluateLabelTextAnchor({
        lineWidth: 50,
        labelPosition: 75,
        labelHorizontalShift: 10,
      });
      expect(actual).toBe('middle');
    });
  });
});
