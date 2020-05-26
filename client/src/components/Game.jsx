import React from 'react';
import { scoringFunctions, rollDice } from '../helpers/dice-helpers';
import './Game.scss';
import Scores from './Scores';
import Cup from './Cup';
import initialScores from '../data/scores.json';

const Game = () => {
  const initialCup = [0, 0, 0, 0, 0];
  const initialRollCount = 0;

  const [cup, setCup] = React.useState(initialCup);
  const [kept, setKept] = React.useState([]);
  const [saved, setSaved] = React.useState([]);
  const [numRolls, setNumRolls] = React.useState(initialRollCount);
  const [scores, setScores] = React.useState(initialScores);

  const onRollClick = () => {
    if (numRolls <= 2) {
      setCup(rollDice(cup, kept));
      setNumRolls(prev => prev + 1);
    } else {
      alert(`you've rolled yer last`);
    }
  };

  const toggleKept = (index) => {
    setKept(kept.includes(index) ? kept.filter(i => i !== index) : [...kept, index]);
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
        score: scoringFunctions[scores[key].scoringFunction](scores[key], cup)
      }
    }));
  };

  return (
    <div className="game">
      <Cup
        cup={cup}
        kept={kept}
        toggleKept={toggleKept}
        onRollClick={onRollClick}
      />
      <Scores
        scores={scores}
        onSelectScore={onSelectScore}
      />
    </div>
  );
};

export default Game;
