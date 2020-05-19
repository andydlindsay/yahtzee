import { dieRoll } from '../dice-helpers';

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

});
