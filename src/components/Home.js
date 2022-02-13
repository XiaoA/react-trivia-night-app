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
      <section className="hero is-link">
        <div className="hero-body">

          <h2>Status: {loggedInStatus}</h2>
          <p className="title">Trivia Night</p>
          <p className="subtitle">Test your knowledge alone or with friends!</p>
        </div>
      </section>
      <button onClick={() => handleLogoutClick()}>Log Out</button>
      <button className="button is-primary"><Link to="/register">Register</Link></button>
      <button className="button is-dark"><Link to="/login">Log In</Link></button>
    </div>
  );
};

export default Home;