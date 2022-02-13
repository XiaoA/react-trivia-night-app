import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
// import NavBar from './components/NavBar';
import Dashboard from "./components/Dashboard";
//import PrivateRoute from "./components/PrivateRoute";
//import ForgotPassword from "./components/ForgotPassword";
//import UpdateProfile from "./components/UpdateProfile";
import axios from 'axios';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({})
        }
      }
      )
      .catch(error => {
        console.log("check login error", error)
      });
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
    setUser({})
  }

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data.user);
  }

  return (
    <div className="App">
      <BrowserRouter>

        <Switch>
      
          <Route
            exact
            path={"/"}
            render={props => (
              <Home {...props} handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            )}
          />


          <Route path={"/dashboard"} render={props => (
            <Dashboard {...props} handleLogout={handleLogout}
              loggedInStatus={loggedInStatus}
            />
          )}
          />

          <Route
            path={"/register"}
            render={props => (
              <Register {...props} handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            )}
          />
          <Route
            path={"/login"}
            render={props => (
              <Login {...props} handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            )}
          />

          <Route path="/game" component={Game} />


        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
