import React from "react";
import { NavLink } from "react-router-dom";



const NavBar = ({ isLoggedIn }) => {

  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="./game">
        Play
      </NavLink>
      <NavLink exact to="./register">
        Register
      </NavLink>
      <NavLink exact to="./login">

      </NavLink>
      <NavLink exact to="/">
        {isLoggedIn}
      </NavLink>
    </nav>
  );
}

export default NavBar;
