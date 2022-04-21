import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ isLoggedIn, handleLogout }) => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalIncorrectAnswers, setTotalIncorrectAnswers] = useState(0);
  const [gameUuid, setGameUuid] = useState()

  async function getGameStats() {
    try {
      await axios.get(`${process.env.REACT_APP_TRIVIA_SERVER_BASEURL}/players/${currentUser.uuid}`)
        .then((response) => {
          setTotalQuestions(totalQuestions => response.data.game.total_questions)
          setTotalCorrectAnswers(totalCorrectAnswers => response.data.game.total_correct_answers)
          setTotalIncorrectAnswers(totalIncorrectAnswers => response.data.game.total_incorrect_answers)
          setGameUuid(gameUuid => response.data.game.uuid);
        })
    } catch(error) {
      console.log('error')
    }
  }

  useEffect(() => {
    
      getGameStats();
      localStorage.setItem('gameUuid', JSON.stringify(gameUuid));
    }, [getGameStats, gameUuid])

  const handleLogoutClick = () => {
    axios.delete(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/logout`, { withCredentials: true }).then(response => {
      handleLogout();
    }).catch(error => {
      console.error("logout error");
    })
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <h1 className="has-text-centered">Dashboard</h1>
          <div className="columns">

            <div className="column">
              <div className="card has-text-centered">
                <div className="card-header">
                  <div className="card-header-title is-centered">
                    {currentUser &&
                     <p>{currentUser.username}</p>
                    }
                  </div>
                </div>
                <div className="card-content">
                  <button className="button"><Link to="/game">Play Trivia!</Link></button>
                  <button className="button" onClick={handleLogoutClick}>Log out</button>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title is-centered">
                    My Stats
                  </div>
                </div>
                <div className="card-content my-stats">
                  <li>Total Questions: {totalQuestions ? totalQuestions : 0}</li>
                  <li>Correct Answers: {totalCorrectAnswers ? totalCorrectAnswers : 0}</li>
                  <li>Incorrect Answers: {totalIncorrectAnswers ? totalIncorrectAnswers : 0}</li>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

