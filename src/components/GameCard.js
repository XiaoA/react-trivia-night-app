import React, { useState } from "react";
import Question from './Question';
import Answer from './Answer';
import { shuffleArray, decodeTriviaData } from "../helpers";


const GameCard = ({ data }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(5)

  const questionText =
    data.questions.length > 0 ? data.questions[currentQuestion].question : 'Get ready to play...';

  const answerText =
    data.questions.length > 0
      ? shuffleArray(
        `${data.questions[currentQuestion].incorrect_answers.join("|")}|${data.questions[currentQuestion].correct_answer
          }`.split("|")
      )
      : [];

  const handleAnswerButtonClick = (event) => {
    const selection = event.target.innerText;
    const correctAnswer = data.questions[currentQuestion].correct_answer;

    if (selection === correctAnswer) {
      setScore(score + 1);
    }

    setRemainingQuestions(remainingQuestions - 1)

    if (remainingQuestions > 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setEndGame(true)
    }
  }

  function handlePlayAgainButtonClick() {
    setCurrentQuestion(0);
    setScore(0);
    endGame(false);
    setRemainingQuestions(5)
  }


  return (
    <div className="game-card">
      {endGame ? (
        <div className="game-over">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                <h2>Game over!</h2>
                <h3>Your Score: {score}</h3>

                <button onClick={handlePlayAgainButtonClick}>Play again?</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <article>
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">

                    <h3>Score: {score} | remaining: {remainingQuestions}</h3>

                    <h3>&nbsp; Question: {currentQuestion + 1} / {data.questions.length}</h3>
                  </div>
                </div>
                <div className="card-content">
                  <div className="content">

                    <Question question={decodeTriviaData(questionText)} />
                    <Answer answers={answerText} onAnswer={handleAnswerButtonClick} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default GameCard;

