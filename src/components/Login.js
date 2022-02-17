import React, { useState } from "react";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

const Login = ({ handleLogin, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccessfulLogin = (data) => {
    handleLogin(data);
    console.log('login data', data)
    history.push("/dashboard");
  }

  const handleSubmit = (event) => {
    axios.post(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/sessions`, {
      user: {
        email,
        password
      }
    },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        handleSuccessfulLogin(response.data)
      }
    }).catch(error => {
      console.log('login error', error);
    })
    event.preventDefault();
  }

  return (
    <>
      <section className="hero is-dark is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-white">Log In</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-white">
                Please login to proceed.
              </p>
              <div className="box">
                <figure className="avatar"></figure>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoFocus=""
                        value={email}
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

                  <button className="button is-block is-info is-large is-fullwidth">
                    Login <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
              <p className="has-text-white">
                <Link to="/register"> Sign Up </Link>
                <Link to="/"> Forgot Password?</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
