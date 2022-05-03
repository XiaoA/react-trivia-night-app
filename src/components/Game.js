import React, { useRef, useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import GameCard from "./GameCard";
import useInterval from 'use-interval'

function Game({isLoggedIn}) {
  const [gameState, dispatch] = useContext(GameContext);
  const [questionTimer, setQuestionTimer] = React.useState(20000);
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || undefined;
  const gameUuid = JSON.parse(localStorage.getItem('gameUuid')) || [];
  const customGameUrl = JSON.parse(localStorage.getItem('customGameUrl')) || undefined;
  const [triviaApiEndpoint, setTriviaApiEndpoint] = useState("https://opentdb.com/api.php?amount=5&encode=url3986")

  useEffect(() => {
    if (customGameUrl !== undefined) {
      setTriviaApiEndpoint(customGameUrl)
    }
    
    fetch(triviaApiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "OPEN_TRIVIA_API_QUESTIONS", payload: data.results });
      });
  }, [customGameUrl, dispatch, triviaApiEndpoint]);


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
      <GameCard
    currentUser={currentUser}
    gameUuid={gameUuid}
    isLoggedIn={isLoggedIn}
      />
      </div>
  );
}
export default Game;
