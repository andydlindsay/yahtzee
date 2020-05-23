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
