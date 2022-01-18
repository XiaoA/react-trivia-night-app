import React, { useState } from "react";
import Question from './Question';
import Answer from './Answer';
import { shuffleArray, decodeTriviaData } from "../helpers";


const GameCard = ({ data }) => {
  const [index, setIndex] = useState(0);

  const questionText =
    data.questions.length > 0 ? data.questions[index].question : null;

  const answerText =
    data.questions.length > 0
      ? shuffleArray(
        `${data.questions[index].incorrect_answers.join("|")}|${data.questions[index].correct_answer
          }`.split("|")
      )
      : [];

  function nextQuestion() {
    setIndex(index + 1);
  }

  function onAnswer(event) {
    const selection = event.target.innerHTML;

    if (selection === data.questions[index].correct_answer) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
    nextQuestion();
  }

  return (

    <article>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <div className="content">

                <Question question={decodeTriviaData(questionText)} />
                <Answer answers={answerText} onAnswer={onAnswer} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

  )
}

export default GameCard;
