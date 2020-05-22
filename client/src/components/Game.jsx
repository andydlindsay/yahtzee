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

  const saveCup = () => {
    const newSaved = [...saved, cup];
    setSaved(newSaved);
    setCup(initialCup);
    setKept([]);
    setNumRolls(initialRollCount);
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
      <div>
        <button
          onClick={saveCup}
        >Save Cup</button>
      </div>
      <div className="saved-rolls">
        { saved.map(set => {
          return (
            <div>
              { set.map(d => (
                <Die
                  value={d}
                />
              )) }
            </div>
          )
        }) }
      </div>
    </div>
  );
};

export default Game;
