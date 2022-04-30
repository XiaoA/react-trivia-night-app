import React, { createContext, useReducer } from "react";
import { mergeAnswerLists, decodeApiText } from "../helpers";

const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  gameOver: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
  playerAnswersLog: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_TRIVIA_API_QUESTIONS": {
      const decodedQuestions = decodeApiText(action.payload);

      if (localStorage.getItem("Answers")) {
        localStorage.removeItem("Answers")
      }

      return {
        ...state,
        questions: decodedQuestions,
        answers: mergeAnswerLists(decodedQuestions[0]),
      };
    }

    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
          state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;
      const currentAnswer = action.payload
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }

    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : mergeAnswerLists(state.questions[currentQuestionIndex]);
      const correctAnswer =
        state.questions[state.currentQuestionIndex].correctAnswer
      const playerAnswer = state.currentAnswer || "skipped";
      const answerIsCorrect = playerAnswer === correctAnswer;
      const playerAnswersLog = [
        {
          "questionIndex": state.currentQuestionIndex,
          "correctAnswer": correctAnswer,
          "playerAnswer": playerAnswer,
          "answerIsCorrect": answerIsCorrect
        }
      ];

      // save to localStorage -- Might want to extract later
      let playerAnswerStorage = JSON.parse(localStorage.getItem('Answers')) || [];
      const logPlayerAnswers = playerAnswerStorage.push(playerAnswersLog)
      localStorage.setItem('Answers', JSON.stringify(playerAnswerStorage))
      // end save to localStorage

      return {
        ...state,
        showResults,
        currentQuestionIndex,
        answers,
        correctAnswer,
        playerAnswer,
        answerIsCorrect,
        currentAnswer: "",
        playerAnswersLog
      };
    }

    case "PLAY_AGAIN": {
      localStorage.removeItem('Answers');
      return initialState;
    }

    default: {
      return state;
    };
  }
}

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
