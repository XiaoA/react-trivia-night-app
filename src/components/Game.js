import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from './GameCard';

const endPoint = 'https://opentdb.com/api.php';

const Game = () => {
  const [data, setData] = useState({ questions: [] });

  useEffect(() => {
    loadQuestions();
  }, [])

  async function loadQuestions() {
    const quizData = await axios.get(endPoint);
    setData({ questions: quizData.data.results });
  }

  return (
    <div>
      <GameCard data={data} />
    </div>
  )
}

export default Game;
