import React, { useContext } from 'react';
import Question from './Question';
import { GameContext } from '../contexts/GameContext';
import ProgressBar from './ProgressBar';
import GameOver from './GameOver';

function GameCard() {
  const [gameState, dispatch] = useContext(GameContext);
  return (
    <>
      {gameState.showResults && (
        <div className="game-over">
          <GameOver />
        </div>
      )}

      {!gameState.showResults && gameState.questions.length > 0 && (
        <div className="game">
          <ProgressBar />
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                <div className="card-content">
                  <Question />
                </div>
              </div>
            </div>
          </div>
          <div className="buttons is-centered">
            <button className="button next-button" onClick={() => dispatch({ type: "NEXT_QUESTION" })} title="nextButton">Next Question</button>
          </div>
        </div>
      )}
    </>
  )
}

export default GameCard;
