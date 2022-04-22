import React, { useState, useContext, useEffect, useCallback } from "react";
import { GameContext } from "../contexts/GameContext";
import axios from 'axios';

const GameOver = ({ gameUuid, isLoggedIn, currentUser }) => {
  const [gameState, dispatch] = useContext(GameContext);
  const savedAnswers = JSON.parse(localStorage.getItem('Answers')) || [];

  const totalQuestions = parseInt(gameState.questions.length);
  const totalCorrectAnswers = parseInt(gameState.correctAnswersCount);
  const totalIncorrectAnswers = parseInt(gameState.questions.length) - parseInt(gameState.correctAnswersCount);


  const saveGameStatsToDatabase = useCallback(() => {
    axios.put(`${process.env.REACT_APP_TRIVIA_SERVER_BASEURL}/games/${gameUuid}`, {
      totalQuestions,
      totalCorrectAnswers,
      totalIncorrectAnswers
    })
      .then(response => {
        if (response.data.status === 'created') {
          console.log('Successfully saved game stats.')
        }
      }).catch(error => {
        console.log('There was an error saving game stats');
      })
  }, [gameUuid, totalQuestions, totalCorrectAnswers, totalIncorrectAnswers])

  useEffect(() => {
    saveGameStatsToDatabase()
  }, [saveGameStatsToDatabase])

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

                      <div className="table table-container is-hoverable is-fullwidth" >
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

                            {savedAnswers.map((answer, index) => (
                              <tr key={index}>


                                <td>{answer[0].questionIndex + 1}</td>
                                <td>{answer[0].correctAnswer}</td>
                                <td>{answer[0].playerAnswer}</td>
                                <td>{answer[0].answerIsCorrect.toString()}</td>
                              </tr>
                            )
                            )}


                          </tbody>


                        </table>
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
        </div>
      </section>
    </>
  );
}


export default GameOver;
