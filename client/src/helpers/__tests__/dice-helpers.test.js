import { dieRoll, scoringFunctions, rollDice } from '../dice-helpers';
const { target, fullHouse, ofAKind, inARow, totalDice } = scoringFunctions;

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

  describe('rollDice function', () => {

    it('returns a valid cup', () => {
      const cup = [];
      const kept = [];
      const numDice = 8;
      const result = rollDice(cup, kept, numDice);

      expect(result).toHaveLength(8);
      expect(typeof result[0]).toBe('number');
    });

    it('keeps the kept dice', () => {
      const cup = [1, 2, 3, 4, 5];
      const kept = [1, 3];
      const result = rollDice(cup, kept);

      expect(result[1]).toBe(cup[1]);
      expect(result[3]).toBe(cup[3]);
    });

  });

  describe('Scoring Functions', () => {

    describe('Target function', () => {

      it('can calculate a simple score', () => {
        const score = {
          target: 1,
          valPerDie: 1
        };
        const set = [1, 2, 3, 4, 5];
        const result = target(score, set);
        expect(result).toBe(1);
      });

      it('can calculate a complex score', () => {
        const score = {
          target: 4,
          valPerDie: 4
        };
        const set = [1, 4, 2, 4, 3];
        const result = target(score, set);
        expect(result).toBe(8);
      });

    });

    describe('Full House function', () => {

      let score;

      beforeEach(() => {
        score = {
          amount: 25 
        };
      });

      it('returns correct score when passed a valid set', () => {
        const set = [3, 4, 3, 4, 3];
        const result = fullHouse(score, set);
        expect(result).toBe(score.amount);
      });

      it('returns 0 when passed an invalid set', () => {
        const set = [3, 4, 3, 4, 5];
        const result = fullHouse(score, set);
        expect(result).toBe(0);
      });

    });

    describe('Of A Kind function', () => {

      it('returns the correct amount given a valid set', () => {
        const score = {
          ofAKind: 3
        };
        let set = [2, 3, 2, 4, 2];
        let result = ofAKind(score, set);
        expect(result).toBe(13);

        score.ofAKind = 4;
        set = [3, 3, 5, 3, 3];
        result = ofAKind(score, set);
        expect(result).toBe(17);
      });

      it('returns 0 when given an invalid set', () => {
        const score = {
          ofAKind: 3
        };
        let set = [2, 3, 2, 4, 5];
        let result = ofAKind(score, set);
        expect(result).toBe(0);

        score.ofAKind = 4;
        set = [2, 2, 3, 2, 5];
        result = ofAKind(score, set);
        expect(result).toBe(0);
      });

      it('returns 50 for a yahtzee instead of the total of the dice', () => {
        const score = {
          ofAKind: 5,
          amount: 50
        };
        const set = [2, 2, 2, 2, 2];
        const result = ofAKind(score, set);
        expect(result).toBe(50);
      });

    });

    describe('In A Row function', () => {

      it('returns the correct amount given a valid set', () => {
        const score = {
          inARow: 4,
          amount: 30
        };
        let set = [1, 2, 4, 3, 6];
        let result = inARow(score, set);
        expect(result).toBe(score.amount);

        score.inARow = 5;
        score.amount = 40;
        set = [2, 3, 4, 6, 5];
        result = inARow(score, set);
        expect(result).toBe(score.amount);
      });

      it('returns 0 when given an invalid set', () => {
        const score = {
          inARow: 4,
          amount: 30
        };
        let set = [1, 6, 4, 3, 6];
        let result = inARow(score, set);
        expect(result).toBe(0);

        score.inARow = 5;
        score.amount = 40;
        set = [2, 3, 4, 5, 5];
        result = inARow(score, set);
        expect(result).toBe(0);
      });

    });

    describe('Total Dice function', () => {

      it('can total a set of dice', () => {
        let set = [1, 2, 3, 4, 5];
        let result = totalDice({}, set);
        expect(result).toBe(15);

        set = [4, 4, 4, 4, 4];
        result = totalDice({}, set);
        expect(result).toBe(20);
      });

    });

  });

});
