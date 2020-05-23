import React from 'react';
import { calcScore, dieRoll } from '../helpers/dice-helpers';
import './Game.scss';
import Die from './Die';
import Scores from './Scores';

const Game = () => {
  const initialCup = [0, 0, 0, 0, 0];
  const initialRollCount = 0;

  const [cup, setCup] = React.useState(initialCup);
  const [kept, setKept] = React.useState([]);
  const [saved, setSaved] = React.useState([]);
  const [numRolls, setNumRolls] = React.useState(initialRollCount);
  const [scores, setScores] = React.useState({
    'ones': {
      name: `Aces`,
      target: [1],
      score: 0,
      setId: null,
      valPerDie: 1,
      howToScore: 'Count and Add Only Aces',
      section: 'upper'
    },
    'twos': {
      name: `Twos`,
      target: [2],
      score: 0,
      setId: null,
      valPerDie: 2,
      howToScore: 'Count and Add Only Twos',
      section: 'upper'
    },
    'threes': {
      name: `Threes`,
      target: [3],
      score: 0,
      setId: null,
      valPerDie: 3,
      howToScore: 'Count and Add Only Threes',
      section: 'upper'
    },
    'fours': {
      name: `Fours`,
      target: [4],
      score: 0,
      setId: null,
      valPerDie: 4,
      howToScore: 'Count and Add Only Fours',
      section: 'upper'
    },
    'fives': {
      name: `Fives`,
      target: [5],
      score: 0,
      setId: null,
      valPerDie: 5,
      howToScore: 'Count and Add Only Fives',
      section: 'upper'
    },
    'sixes': {
      name: `Sixes`,
      target: [6],
      score: 0,
      setId: null,
      valPerDie: 6,
      howToScore: 'Count and Add Only Sixes',
      section: 'upper'
    },
  });

  const rollDice = () => {
    if (numRolls <= 2) {
      const newCup = [];
      for (let i = 0; i < 5; i++) {
        if (kept.includes(i)) {
          newCup.push(cup[i]);
        } else {
          newCup.push(dieRoll(6));
        }
      }
      setCup(newCup);
      setNumRolls(prev => prev + 1);
    } else {
      alert(`you've rolled yer last`);
    }
  };

  const toggleKept = (index) => {
    let newKept;
    if (kept.includes(index)) {
      newKept = kept.filter(i => i !== index);
    } else {
      newKept = [...kept, index];
    }
    setKept(newKept);
  };

  const isKept = (index) => {
    return kept.includes(index);
  };

  const onSelectScore = (key) => {
    const newSaved = [...saved, cup];
    setSaved(newSaved);
    setCup(initialCup);
    setKept([]);
    setNumRolls(initialRollCount);
    setScores(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        setId: newSaved.length - 1,
        score: calcScore(scores[key].target, cup, scores[key].valPerDie)
      }
    }));
  };

  return (
    <div className="game">
      <h2>Game</h2>
      <div>
        <button
          onClick={rollDice}
        >Roll</button>
      </div>
      <div className="cup">
        { cup.map((d, index) => (
          <Die
            value={d}
            index={index}
            kept={isKept(index)}
            onClick={toggleKept}
            key={index}
          />
        )) }
      </div>
      <Scores scores={scores} onSelectScore={onSelectScore} />
    </div>
  );
};

export default Game;
