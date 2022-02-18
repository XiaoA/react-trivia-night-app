import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ChooseGameOptions from './ChooseGameOptions';
const Home = ({ handleLogout, isLoggedIn }) => {

  const handleLogoutClick = () => {
    axios.delete(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/logout`, { withCredentials: true }).then(response => {
      handleLogout();
    }).catch(error => {
      console.error("logout error", error);
    })
  }

  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6 is-offset-3">
            <h1 className="title">
              Trivia Night
            </h1>
            <h2 className="subtitle">
              Test your knowledge alone or with friends!
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
