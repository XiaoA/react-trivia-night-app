import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

const Login = ({ handleLogin, history, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect Authenticated users from Login form
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard")
    }
  }, [isLoggedIn, history]);


  const onSubmit = (data, event) => {
    completeLogin(data);
  }

  const handleSuccessfulLogin = (data) => {
    handleLogin(data);
    console.log('login data', data)
    history.push("/dashboard");
  }

  const { register, handleSubmit, errors, formState = { errors } } = useForm({
    mode: "onBlur"
  })

  function completeLogin(data) {
    //  const handleSubmit = (event) => {
    axios.post(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/sessions`, {
      user: {
        email,
        password
      }
    },
      { withCredentials: true }
    ).then(response => {
      console.log('resp', response.data)
      if (response.data.logged_in) {
        handleSuccessfulLogin(response.data)
      }
    }).catch(error => {
      console.log('login error', error);
    })
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoFocus=""

                        onChange={event => setEmail(event.target.value)}
                        ref={register({
                          required: 'Email is required.',
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: 'Invalid email address.'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="error-message">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        onChange={event => setPassword(event.target.value)}
                        ref={register({
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="error-message">{errors.password.message}</p>
                      )}
                    </div>
                  </div>

                  <button className="button is-block is-info is-large is-fullwidth">
                    Login <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
              <p className="has-text-white">
                <Link to="/register"> Sign Up </Link> |
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
