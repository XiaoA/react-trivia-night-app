import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";


const Answer = ({
  answerText,
  index,
  onSelectAnswer,
  currentAnswer,
  correctAnswer,
}) => {
  const [gameState, dispatch] = useContext(GameContext);
  const choiceMap = ["A", "B", "C", "D"];
  const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  const isWrongAnswer =
    currentAnswer === answerText && currentAnswer !== correctAnswer;

  const correctAnswerClass = isCorrectAnswer ? "correct-answer" : "";
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";
  const disabledClass = currentAnswer ? "disabled-answer" : "";

  console.log('currentAnswer', currentAnswer)
  console.log('correct answer', correctAnswer)

  return (
    <div
      className={`answer answer-button ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => onSelectAnswer(answerText)}
    >
      <div className="answer-option">{choiceMap[index]}</div>
      <div
        className="answer-text"
        onClick={() => dispatch({ type: "SELECT_ANSWER" })}
        title="nextButton"
      >
        {answerText}
      </div>
    </div>
  );
};

export default Answer;
