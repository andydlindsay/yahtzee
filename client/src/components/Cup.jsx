import React from 'react';
import './Cup.scss';
import Die from './Die';

const Cup = (props) => {
  const {cup, onRollClick, kept, toggleKept} = props;

  const isKept = (index) => {
    return kept.includes(index);
  };

  return (
    <div className="cup">
      <div className="roll-button">
        <button
          onClick={onRollClick}
        >Roll</button>
      </div>
      <div className="dice">
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
    </div>
  );
};

export default Cup;
