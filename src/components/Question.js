import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Answer from './Answer';

const Question = () => {
  const [gameState, dispatch] = useContext(GameContext);
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  return (
    <div>
      <div className="content question">
        <h2>{currentQuestion.question}</h2>
      </div>

      <div className="answers is-centered">
        {gameState.answers.map((answer, index) => (

          <Answer answerText={answer} key={answer} index={index} currentAnswer={gameState.currentAnswer} correctAnswer={currentQuestion.correctAnswer} onSelectAnswer={(answerText) => dispatch({ type: "SELECT_ANSWER", payload: answerText })} />
        ))}
      </div>
    </div>
  )
}

export default Question;
