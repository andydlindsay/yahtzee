import { calcScore, dieRoll } from '../dice-helpers';

describe('Dice Helpers', () => {

  describe('dieRoll function', () => {

    test('returns an integer greater than 0 and less than or equal to the number of sides of the dice', () => {
      const sampleSize = 20;
      const samples = [];
      const numSides = 6;

      // generate a sample
      for (let i = 0; i < sampleSize; i++) {
        samples.push(dieRoll(numSides));
      }

      expect(samples).not.toContain(0);
      expect(samples).not.toContain(numSides + 1);
    });

  });

  describe('calcScore function', () => {

    it('can calculate a simple score', () => {
      const target = [1];
      const set = [1, 2, 3, 4, 5];
      const valPerDie = 1;
      const result = calcScore(target, set, valPerDie);
      expect(result).toBe(1);
    });

    it('can calculate a complex score', () => {
      const target = [4];
      const set = [1, 4, 3, 4, 4];
      const valPerDie = 4;
      const result = calcScore(target, set, valPerDie);
      expect(result).toBe(12);
    });

    it('can calculate a complex score with multiple targets', () => {
      const target = [3, 4];
      const set = [1, 4, 3, 4, 4];
      const valPerDie = 4;
      const result = calcScore(target, set, valPerDie);
      expect(result).toBe(16);
    });

  });

});
