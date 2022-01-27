import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from './GameCard';

const endPoint = 'https://opentdb.com/api.php';

const Game = () => {
  const [triviaData, setTriviaData] = useState({ questions: [] });

  useEffect(() => {
    loadQuestions();
  }, [])

  async function loadQuestions() {
    const gameQuestions = await axios.get(endPoint);
    setTriviaData({ questions: gameQuestions.data.results });
  }

  return (
    <div>
      <GameCard data={triviaData} />
    </div>
  )
}

export default Game;
