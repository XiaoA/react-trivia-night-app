import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = ({ handleLogout, loggedInStatus }) => {

  const handleLogoutClick = () => {
    axios.delete(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/logout`, { withCredentials: true }).then(response => {
      handleLogout();
    }).catch(error => {
      console.error("logout error", error);
    })
  }

  return (
    <div className="homepage">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <button className="button is-light" onClick={() => handleLogoutClick()}>Log Out</button>
            <button className="button is-light"><Link to="/register">Register</Link></button>
            <button className="button is-light"><Link to="/login">Log In</Link></button>
            <button className="button is-light"><Link to="/dashboard">Dashboard</Link></button>
            <button className="button is-light"><Link to="/game">Game</Link></button>
            <h2>Status: {loggedInStatus}</h2>
          </div>
        </div>
      </div>

      <section className="hero is-link">
        <div className="hero-body">

          <p className="title">Trivia Night</p>
          <p className="subtitle">Test your knowledge alone or with friends!</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
