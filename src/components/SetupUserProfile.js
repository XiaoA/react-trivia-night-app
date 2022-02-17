import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from 'axios';


const SetupUserProfile = ({ handleLogin, handleLogout, loggedInStatus }) => {
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  let location = useLocation();
  let history = useHistory();

   useEffect(() => {
     setUserId(location.userId);
     setEmail(location.email);
    }, [location]);

  
  const handleSuccessfulProfileSetup = (data) => {
    handleLogin(data);
    history.push("/dashboard");
  }

  // refactor to ensure both are saved
  const handleSubmit = (event) => {
    console.log('setup profile handle submit event', event)
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
    event.preventDefault();

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
    event.preventDefault();
    history.push("/dashboard");
  }


  return (
    <>
      <section className="hero is-dark is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-white">Great. Now, Lets Set Up Your Profile</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-white">
                Please create a unique username and team name for the site.
              </p>


              <div className="box">
                <form onSubmit={handleSubmit}>
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
export default SetupUserProfile;
