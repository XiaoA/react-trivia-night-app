import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../mocks/data.json';
import GameCard from './GameCard';

const endPoint = './data.json';

const Game = () => {
  const [data, setData] = useState({ questions: [] });

  useEffect(() => {
    loadData();
  }, [])

  async function loadData() {
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
