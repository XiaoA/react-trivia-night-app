import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const GameOver = () => {
  const [gameState, dispatch] = useContext(GameContext);
  return (
    <section>
      <div className="content">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card has-text-centered">
              <h2>Game Over!</h2>
              <div className="card-content">
                <div className="game-over">
                  <div className="game-stats">
                    <div>
                      You got {gameState.correctAnswersCount} of{" "}
                      {gameState.questions.length} correct.
                    </div>
                  </div>
                  <div className="buttons is-centered">
                    <button
                      className="button is-link"
                      onClick={() => dispatch({ type: "PLAY_AGAIN" })}
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameOver;
