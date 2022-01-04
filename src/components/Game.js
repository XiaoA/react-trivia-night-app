import React from 'react';
import Question from './Question';
import Answer from './Answer';

const Game = () => {
  const question = "To the nearest minute, how long does it take for light to travel from the Sun to the Earth?"
  const answer = "8 minutes"
  return (
    <div>
      <Question question={question} />
      <Answer answer={answer} />
    </div>
  )
}

export default Game;
