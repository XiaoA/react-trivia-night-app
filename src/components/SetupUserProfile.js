import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const SetupUserProfile = ({ handleLogin, handleLogout, loggedInStatus, history }) => {
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');

  const handleSuccessfulProfileSetup = (data) => {
    handleLogin(data);
    history.push("/dashboard");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('username:', event.target[0].value)
    console.log('team name:', event.target[1].value)
    // axios.post(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/registrations`, {
    //   user: {
    //     email,
    //     password,
    //     password_confirmation
    //   }
    // },
    //   { withCredentials: true }
    // ).then(response => {
    //   if (response.data.status === 'created') {
    //     handleSuccessfulProfileSetup(response.data)
    //   }
    // }).catch(error => {
    //   console.log('registration error', error);
    // })
    // event.preventDefault();
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
