import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import "./Register.css";
import { Link, useHistory, useLocation } from "react-router-dom";

const Register = ({ handleLogin, handleLogout, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [userId, setUserId] = useState(0)
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');
  //  const [userId, setUserId] = useState('');
  //  const [email, setEmail] = useState('');

  let location = useLocation();
  let history = useHistory();

useEffect(()=>{
  if(isLoggedIn){
    history.push("/dashboard")
  }
},[isLoggedIn,history]);

  useEffect(() => {
    setUserId(location.userId);
    setEmail(location.email);
  }, [location]);


  const handleSuccessfulProfileSetup = (data) => {
    handleLogin(data);
    history.push("/dashboard");
  }

  //  let history = useHistory()

  const handleSuccessfulAuth = (data) => {
    setUserId(data.user.id)
    handleLogin(data);
    history.push({
      pathname: "/setup-user-profile",
      userId: data.user.id,
      email: data.user.email
    });
  }

  const handleSubmit = (event) => {
    
  function registerNewAccount() {
    axios.post(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/registrations`, {
      user: {
        email,
        password,
        password_confirmation
      }
    },
      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log('registration error', error);
    })
   // event.preventDefault();
  }
  
  function createUsername() {
    setUsername(event.target[0].value);
    setTeamName(event.target[1].value);

    axios.post('http://localhost:5000/players/add', {
      username,
      userId,
      email
    }).then(response => {
      if (response.data.status === 'created') {
        //handleSuccessfulProfileSetup(response.data)
        console.log('player', response)
      }
    }).catch(error => {
      console.log('registration error', error);
    })
    //    event.preventDefault();
  }

  function createTeamName() {
    axios.post('http://localhost:5000/teams/add', {
      teamName
    }).then(response => {
      if (response.data.status === 'created') {
        handleSuccessfulProfileSetup(response.data)
      }
      console.log('team', response)
    }).catch(error => {
      console.log('registration error', error);
    })

  }

  Promise.all([registerNewAccount, createUsername(), createTeamName()])
    .then((response) => {
      console.log('succcess')
      //event.preventDefault(),
      history.push("/dashboard")
    });

  }

  return (
    <>
      <section className="hero is-dark is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-white">Sign Up</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-white">
                Please register to proceed.
              </p>
              <div className="box">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Your Email"
                        autoFocus=""
                        onChange={event => setEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="password"
                        name="password_confirmation"
                        placeholder="Password Confirmation"
                        value={password_confirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="field"></div>




                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="text"
                        name="text"
                        value={username}
                        placeholder="Choose a unique username"
                        autoFocus=""
                        onChange={event => setUsername(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="text"
                        name="text"
                        placeholder="Choose a unique team name"
                        value={teamName}
                        onChange={event => setTeamName(event.target.value)}
                        required
                      />
                    </div>
                  </div>


                  <div className="field"></div>

                  <button
                    type="submit"
                    className="button is-block is-info is-large is-fullwidth"
                  >
                    Submit{" "}
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
              <p className="has-text-white">
                <Link to="/login"> Login </Link>
                <Link to="/"> Forgot Password </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Register;
