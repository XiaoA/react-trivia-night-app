import React, { useEffect } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Dashboard = ({ currentUser, isLoggedIn, handleLogout }) => {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login")
    }
  }, [isLoggedIn, history]);

  const handleLogoutClick = () => {
    axios.delete(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/logout`, { withCredentials: true }).then(response => {
      handleLogout();
    }).catch(error => {
      console.error("logout error", error);
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
                <div className="card-content">
                  <li>Total Questions</li>
                  <li>Correct Questions</li>
                  <li>Incorrect Questions</li>
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

