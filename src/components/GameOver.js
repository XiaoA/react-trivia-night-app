import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const GameOver = () => {
  const [gameState, dispatch] = useContext(GameContext);
  const savedAnswers = JSON.parse(localStorage.getItem('Answers')) || [];

  return (
    <>
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
                        <h3>
                          You got {gameState.correctAnswersCount} of{" "}
                          {gameState.questions.length} correct.
                        </h3>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="content">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card has-text-centered">
                <h2>Your Answers</h2>
                <div className="card-content">
                  <div className="game-over">
                    <div className="game-stats">
                      {savedAnswers.map((answer, index) => (
                        <div className="table table-container is-hoverable is-fullwidth" key={index}>
                          <table className="display-answers">
                            <thead>
                              <tr>
                                <th>Question Number</th>
                                <th>Correct Answer</th>
                                <th>Your Answer</th>
                                <th>Correct?</th>
                              </tr>
                            </thead>

                            <tbody>

                              <tr>
                                <td>{answer[0].questionIndex + 1}</td>
                                <td>{answer[0].correctAnswer}</td>
                                <td>{answer[0].playerAnswer}</td>
                                <td>{answer[0].answerIsCorrect.toString()}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )
                      )}

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
        </div>
      </section>
    </>
  );
};

export default GameOver;
