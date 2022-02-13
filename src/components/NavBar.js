import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {


  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Trivia Night
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">current user email</a>

            <div className="navbar-dropdown">
              <Link to="/dashboard" className="navbar-item">
                Dashboard
              </Link>

              <Link to="/leaderboard" className="navbar-item">
                Learderboard
              </Link>

              <Link to="/game" className="navbar-item">
                Play Trivia
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/register" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <Link to="/login" className="button is-light">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
