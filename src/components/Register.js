import React, { useState } from "react";
import axios from 'axios';
import "./Register.css";
import { Link, useHistory } from "react-router-dom";

const Register = ({ handleLogin, handleLogout, loggedInStatus, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

   const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    history.push("/setup-user-profile");
  }

  const handleSubmit = (event) => {
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
    event.preventDefault();
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

                  <button

                    type="submit"
                    className="button is-block is-info is-large is-fullwidth"
                  >
                    Register{" "}
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
