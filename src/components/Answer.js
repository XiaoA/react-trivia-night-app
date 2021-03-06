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

  return (
    <div className={`answer answer-button ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => onSelectAnswer(answerText)}>
      <div onClick={() => dispatch({ type: "SHOW_ANSWER" })} className="answer-option"> {choiceMap[index]} </div>
      <div className="answer-text" title="nextButton" >
        {answerText}
      </div>
    </div>
  );
};

export default Answer;
