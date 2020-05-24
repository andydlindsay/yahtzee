import { uniq, isEqual } from 'lodash';

export const dieRoll = (sides) => {
  return Math.floor(Math.random() * sides) + 1;
};

export const calcScore = (target, set, valPerDie) => {
  let total = 0;
  for (const die of set) {
    if (target.includes(die)) {
      total++;
    }
  }
  return total * valPerDie;
};

const createSetObj = (set) => {
  const setObj = {};
  for (const die of set) {
    setObj[die] = setObj[die] ? setObj[die] + 1 : 1;
  }
  return setObj;
};

export const scoringFunctions = {
  target: (score, set) => {
    const { target, valPerDie } = score;
    let total = 0;
    for (const die of set) {
      if (target.includes(die)) {
        total++;
      }
    }
    return total * valPerDie;
  },
  fullHouse: (score, set) => {
    const setObj = createSetObj(set);
    const vals = Object.values(setObj);
    if (vals.includes(3) && vals.includes(2)) {
      return score.amount;
    }
    return 0;
  },
  ofAKind: (score, set) => {
    const setObj = createSetObj(set);
    for (const key in setObj) {
      if (setObj[key] >= score.ofAKind) {
        if (score.amount) {
          return score.amount;
        }
        return scoringFunctions.totalDice(score, set);
      }
    }
    return 0;
  },
  inARow: (score, set) => {
    const combos = {
      '4': [
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 6],
        [2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6]
      ],
      '5': [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6]
      ]
    };
    const checkers = combos[score.inARow];
    const sortedUnique = uniq(set).sort();
    for (const check of checkers) {
      if (isEqual(sortedUnique, check)) {
        return score.amount;
      }
    }
    return 0;
  },
  totalDice: (score, set) => {
    return set.reduce((acc, cur) => acc + cur, 0);
  }
};
