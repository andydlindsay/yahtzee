import React from 'react';
import './Scores.scss';

const Scores = (props) => {
  const {scores, onSelectScore} = props;

  const getSectionScores = (section) => {
    const output = [];
    for (const key in scores) {
      if (scores[key].section === section) {
        output.push([key, scores[key]]);
      }
    }
    return output;
  };

  const sectionSubTotal = (section) => {
    let total = 0;
    for (const key in scores) {
      if (scores[key].section === section) {
        total += scores[key].score;
      }
    }
    return total;
  };

  const calcBonus = () => {
    if (sectionSubTotal('upper') >= 63) {
      return 35;
    }
    return 0;
  };

  const upperSectionTotal = () => {
    return sectionSubTotal('upper') + calcBonus();
  };

  return (
    <div className="scores">
      <table>
        <tr>
          <th className="left">UPPER SECTION</th>
          <th>HOW TO SCORE</th>
          <th>GAME #1</th>
        </tr>
        { getSectionScores('upper').map(([key, score]) => {
          return (
            <tr key={key}>
              <td className="left">{score.name}</td>
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
          <td className="left">TOTAL SCORE</td>
          <td>----></td>
          <td>{sectionSubTotal('upper')}</td>
        </tr>
        <tr>
          <td className="left">BONUS</td>
          <td>SCORE 35</td>
          <td>{calcBonus()}</td>
        </tr>
        <tr>
          <td className="left">UPPER SECTION TOTAL</td>
          <td>----></td>
          <td>{upperSectionTotal()}</td>
        </tr>
      </table>

      <table>
        <tr>
          <th colSpan="3" className="left">LOWER SECTION</th>
        </tr>
        { getSectionScores('lower').map(([key, score]) => {
          return (
            <tr key={key}>
              <td className="left">{score.name}</td>
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
          <td className="left">LOWER SECTION TOTAL</td>
          <td>----></td>
          <td>{sectionSubTotal('lower')}</td>
        </tr>
        <tr>
          <td className="left">UPPER SECTION TOTAL</td>
          <td>----></td>
          <td>{upperSectionTotal()}</td>
        </tr>
        <tr>
          <td className="left">GRAND TOTAL</td>
          <td>----></td>
          <td>{upperSectionTotal() + sectionSubTotal('lower')}</td>
        </tr>
      </table>
    </div>
  );
};

export default Scores;
