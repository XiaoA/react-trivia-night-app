import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import GameCard from "./GameCard";
import useInterval from 'use-interval'

function Game() {
  const [gameState, dispatch] = useContext(GameContext);
  const [questionTimer, setQuestionTimer] = React.useState(20000);

  const triviaApiEndpoint =
        "https://opentdb.com/api.php?amount=5&encode=url3986";


  useEffect(() => {
    if (gameState.questions.length > 0) {
      return;
    }
    fetch(triviaApiEndpoint)
      .then((response) => response.json())
      .then((data) => {

        dispatch({ type: "OPEN_TRIVIA_API_QUESTIONS", payload: data.results });

      });
  }, [dispatch, gameState.questions.length]);

  useInterval(() => {
    if (gameState.showResults === true) {
      return;
    }
    setQuestionTimer(questionTimer);
    dispatch({ type: "NEXT_QUESTION" });

    return () => clearInterval(questionTimer);
  }, questionTimer);

  return (
    <div>
      <GameCard />
    </div>
  );
}
export default Game;
