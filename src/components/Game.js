import React from 'react';
import Question from './Question';
import Answer from './Answer';

const Game = () => {
  const question = "To the nearest minute, how long does it take for light to travel from the Sun to the Earth?"
  const answers = ["8 Minutes", "6 Minutes", "2 Minutes", "12 Minutes"]

  return (
    <article>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <Question question={question} />
                {answers.map((answer) => <Answer answerText={answer} key={answer} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Game;
