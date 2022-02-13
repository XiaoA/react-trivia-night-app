import React, { createContext, useReducer } from "react";
import { mergeAnswerLists, decodeApiText } from "../helpers";

const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  gameOver: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
          state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;

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
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "PLAY_AGAIN": {
      return initialState;
    }
    case "OPEN_TRIVIA_API_QUESTIONS": {
      const decodedQuestions = decodeApiText(action.payload);
      return {
        ...state,
        questions: decodedQuestions,
        answers: mergeAnswerLists(decodedQuestions[0]),
      };
    }
    default: {
      return state;
    }
  }
};

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
