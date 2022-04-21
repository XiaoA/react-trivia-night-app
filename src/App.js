import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect, useLocation } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from './components/NavBar';
import Dashboard from "./components/Dashboard";
import ChooseGameOptions from './components/ChooseGameOptions';

import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  const checkLoginStatus = () => {
    axios.get(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/logged_in`, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && isLoggedIn === false) {
          setIsLoggedIn(true);
        } else if (!response.data.logged_in && isLoggedIn === true) {
          handleLogout()
        }
      })
      .catch(error => {
        console.log("login error")
      });
  }

  useEffect(() => {
    checkLoginStatus()
  }, [checkLoginStatus])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser({})
    window.localStorage.removeItem('currentUser');
  }

  const handleLogin = (data) => {
    setIsLoggedIn(true)
    setCurrentUser({ ...data })
    window.localStorage.setItem('currentUser', JSON.stringify(data));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => (
              <Home {...props} handleLogin={handleLogin}
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            )}
          />


          <Route path={"/dashboard"} render={props => (
            <Dashboard {...props} handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          )}
          />

          <Route
            path={"/register"}
            render={props => (
              <Register {...props} handleLogin={handleLogin}
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            )}
          />

          <Route
            path={"/login"}
            render={props => (
              <Login {...props} handleLogin={handleLogin}
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            )}
          />

          <Route path={"/game"} render={props => (
            <Game {...props}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          )}
          />


          <Route path="/game-options" component={ChooseGameOptions} />

          <Redirect to="/" />

        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
