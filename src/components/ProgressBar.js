import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const ProgressBar = () => {
  const [gameState, dispatch] = useContext(GameContext);
  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">
              Score: {gameState.correctAnswersCount}
              <br />
              Question {gameState.currentQuestionIndex + 1}/
              {gameState.questions.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;
