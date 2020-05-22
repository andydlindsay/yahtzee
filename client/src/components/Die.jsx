import React from 'react';
import './Die.scss';

const Die = (props) => {
  const onClick = props.onClick || (() => {});
  return (
    <div
      className={`die ${props.kept ? 'kept' : ''}`}
      onClick={() => onClick(props.index)}
    >
      {props.value ? props.value : '?'}
    </div>
  );
};

export default Die;
