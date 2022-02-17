import React, { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = ({ loggedInStatus }) => {

  // function getPlayerList() { }
  // axios.get('http://localhost:5000/teams', {
  // }).then(response => {
  //   if (response.data) {
  //     console.log('teams', response)
  //     return (playersList)
  //   }
  // }).catch(error => {
  //   console.log('registration error', error);
  // })

  return (
    <>
      <div className="container">
        <div className="content">
          <h1 className="has-text-centered">Dashboard</h1>
          <div className="columns">
            <div className="column">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    My Stats
                  </div>
                </div>
                <div className="card-content">
                  <li>Total Questions</li>
                  <li>Correct Questions</li>
                  <li>Incorrect Questions</li>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card has-text-centered">
                <div className="card-header">
                  <div className="card-header-title">
                    USERNAME
                  </div>
                </div>
                <div className="card-content">
      <button className="button"><Link to="/game">Play Trivia!</Link></button>
            <button className="button"><Link to="/logout">Logout</Link></button>
      
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    My Teams
                  </div>
                </div>
                <div className="card-content">
                  <li>Team A</li>
                  <li>Team B</li>
                  <li>Team C</li>
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

