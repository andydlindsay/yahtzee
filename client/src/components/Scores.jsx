import React from 'react';
import './Scores.scss';

const Scores = (props) => {
  const {scores, onSelectScore} = props;

  const showScores = () => {
    const output = [];
    for (const key in scores) {
      output.push([key, scores[key]]);
    }
    return output;
  };

  const totalScore = () => {
    let total = 0;
    for (const key in scores) {
      total += scores[key].score;
    }
    return total;
  };

  const calcBonus = () => {
    if (totalScore() >= 63) {
      return 35;
    }
    return 0;
  };

  return (
    <div className="scores">
      <table>
        <tr>
          <th>UPPER SECTION</th>
          <th>HOW TO SCORE</th>
          <th>GAME #1</th>
        </tr>
        { showScores().map(([key, score]) => {
          return (
            <tr key={key}>
              <td>{score.name}</td>
              <td>{score.howToScore}</td>
              <td>
              { score.score !== 0 ? 
                score.score :
                <button
                  onClick={() => onSelectScore(key)}
                  className={score.score ? 'hidden' : null}
                >+</button>
              }
              </td>
            </tr>
          );
        }) }
        <tr>
          <td>TOTAL SCORE</td>
          <td>----></td>
          <td>{totalScore()}</td>
        </tr>
        <tr>
          <td>BONUS</td>
          <td>SCORE 35</td>
          <td>{calcBonus()}</td>
        </tr>
        <tr>
          <td>UPPER SECTION TOTAL</td>
          <td>----></td>
          <td>{totalScore() + calcBonus()}</td>
        </tr>
      </table>
    </div>
  );
};

export default Scores;
