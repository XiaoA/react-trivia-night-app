import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect, useLocation } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from './components/NavBar';
import Dashboard from "./components/Dashboard";
import SetupUserProfile from './components/SetupUserProfile';
import ChooseGameOptions from './components/ChooseGameOptions';

//import PrivateRoute from "./components/PrivateRoute";
//import ForgotPassword from "./components/ForgotPassword";
//import UpdateProfile from "./components/UpdateProfile";


import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  //  const [redirectToPreviousPage, setRedirectToPreviousPage] = useState(false);

  const checkLoginStatus = () => {
    axios.get(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/logged_in`, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && isLoggedIn === false) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.user)
        } else if (!response.data.logged_in && isLoggedIn === true) {
          isLoggedIn(false);
          setCurrentUser({})
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
    setIsLoggedIn(false)
    setCurrentUser({})
  }

  const handleLogin = (data) => {
    setIsLoggedIn(true)
    setCurrentUser(data.user);
   // setRedirectToPreviousPage(true)
  }

  //  const { state } = useLocation()



  // function PrivateRoute({ children, ...rest }) {
  //   return (
  //     <Route {...rest} render={(location) => {
  //       return isLoggedIn
  //         ? children
  //         : <Redirect to={{
  //           pathname: '/login',
  //           state: { from: location}
  //         }} />
  //      }} />

  //   )
  // }
  //  if (redirectToPreviousPage === true) {
  // return <Redirect to={state?.from || "/"} />
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} />
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
            path={"/setup-user-profile"}
            render={props => (
              <SetupUserProfile {...props} handleLogin={handleLogin}
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
          <Route
            exact path={"/setup-user-profile"}
            render={props => (
              <Login {...props} handleLogin={handleLogin}
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            )}
          />


          <Route path="/game" component={Game} />
          <Route path="/choose-game-options" component={ChooseGameOptions} />
          <Redirect to="/" />

        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
