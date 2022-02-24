import React from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';


const NavBar = ({ isLoggedIn, handleLogout }) => {
  const handleLogoutClick = () => {
    axios.delete(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/logout`, { withCredentials: true }).then(response => {
      handleLogout();
    }).catch(error => {
      console.error("logout error", error);
    })
  }

  return (
    <nav className="navbar">
      <button className="button navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <>
        <NavLink className="navbar-item" exact to="/">
          Home
        </NavLink>
        <NavLink className="navbar-item" exact to="./game">
          Quick Game
        </NavLink>
      </>

      {isLoggedIn && (
        <>
          <NavLink className="navbar-item" exact to="./game-options">
          Custom Game
          </NavLink>

          <NavLink className="navbar-item" exact to="./dashboard">
            Dashboard
          </NavLink>

          <NavLink className="navbar-end navbar-item" exact to="./logout">
            <button className="button is-warning" onClick={handleLogoutClick}>Log out</button>


          </NavLink>
        </>
      )}


      {!isLoggedIn && (
        <>
          <NavLink className="navbar-end navbar-item" exact to="./register">
            <button className="button is-warning">
              Register
            </button>
          </NavLink>
          <NavLink className="navbar-item" exact to="./login">
            <button className="button is-success">
              Login
            </button>
          </NavLink>
        </>
      )}

    </nav>
  );
}

export default NavBar;
