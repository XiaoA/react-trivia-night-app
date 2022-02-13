import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = ({ handleLogin, handleLogout, loggedInStatus, history }) => {
  // const handleSuccessfulAuth = (data) => {
  //   handleLogin(data);
  //   history.push("/dashboard");
  // }

  const handleLogoutClick = () => {
    axios.delete('http://localhost:3001/logout', { withCredentials: true }).then(response => {
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
