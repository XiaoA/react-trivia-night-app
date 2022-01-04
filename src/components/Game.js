import React from 'react';
import Question from './Question';

const Game = () => {
const question = "To the nearest minute, how long does it take for light to travel from the Sun to the Earth?"
  return (
    <div>
      <Question question={question}/>
    </div>
  )
}

export default Game;
