import React from 'react';
import { dieRoll } from '../helpers/dice-helpers';
import './Game.scss';
import Die from './Die';

const Game = () => {
  const initialCup = [0, 0, 0, 0, 0];
  const initialRollCount = 0;

  const [cup, setCup] = React.useState(initialCup);
  const [kept, setKept] = React.useState([]);
  const [saved, setSaved] = React.useState([]);
  const [numRolls, setNumRolls] = React.useState(initialRollCount);
  const [scores, setScores] = React.useState({
    'ones': {
      name: `1's`,
      target: [1],
      score: 0,
      setId: null
    },
    'twos': {
      name: `2's`,
      target: [2],
      score: 0,
      setId: null
    },
    'threes': {
      name: `3's`,
      target: [3],
      score: 0,
      setId: null
    },
    'fours': {
      name: `4's`,
      target: [4],
      score: 0,
      setId: null
    },
    'fives': {
      name: `5's`,
      target: [5],
      score: 0,
      setId: null
    },
    'sixes': {
      name: `6's`,
      target: [6],
      score: 0,
      setId: null
    },
  });

  const showScores = () => {
    const output = [];
    for (const key in scores) {
      output.push([key, scores[key]]);
    }
    return output;
  };

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
    const newSaved = saveCup();
    setScores(prev => ({...prev, [key]: {...prev[key], setId: newSaved.length - 1}}));
  };

  const saveCup = () => {
    const newSaved = [...saved, cup];
    setSaved(newSaved);
    setCup(initialCup);
    setKept([]);
    setNumRolls(initialRollCount);
    return newSaved;
  };

  const showSaved = (id) => {
    console.log('saved:', saved[id]);
    return saved[id].map((d, index) => (<Die key={index} value={d}/>));
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
      {/* <div>
        <button
          onClick={saveCup}
        >Save Cup</button>
      </div> */}
      {/* <div className="saved-rolls">
        { saved.map((set, i) => {
          return (
            <div key={i}>
              { set.map((d, index) => (
                <Die key={index}
                  value={d}
                />
              )) }
            </div>
          )
        }) }
      </div> */}
      <div className="scores">
        { showScores().map(([key, score]) => {
          return (
            <div key={key}>
              <button
                onClick={() => onSelectScore(key)}
              >+</button>
              <span> {score.name}</span>
              { score.setId !== null ? showSaved(score.setId) : null }
            </div>
          );
        }) } 
      </div>
    </div>
  );
};

export default Game;
