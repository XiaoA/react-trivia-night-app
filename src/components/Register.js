import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Register.css";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const Register = ({ handleLogin, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [username, setUsername] = useState('');
  const [uuid, setUuid] = useState('');
  const [errorList, setErrorList] = useState([]);

  let history = useHistory();

  //  Redirect Authenticated users from Register form
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard")
    }

    return () => {
      console.log('return from history push')
    }
  }, [isLoggedIn, history]);


  useEffect(() => {
    setUuid(uuidv4())
  }, [])


  // On submit
  const onSubmit = (data, event) => {
    completeRegistration(data);
  }

  useEffect(() => {
    console.log('Logging you in...');
  }, [onSubmit])

  // Initialize React Hook Form
  const { register, handleSubmit, errors, formState = { errors } } = useForm({
    mode: "onBlur"
  })

  const handleRegistration = (data) => {
    handleLogin(data);
    history.push("/dashboard")
  }


  function completeRegistration(data) {
    async function createNewAccount() {
      await axios.post(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/registrations`, {
        user: {
          email,
          username,
          uuid: uuid,
          password,
          password_confirmation
        }
      },
                 { withCredentials: true }
                ).then(response => {
                  if (response.data.status === 'created') {
                    handleRegistration(response.data)
                  }
                }).catch(error => {
                  const errorMessage = error.response.data
                  const errorParser = new DOMParser()
                  const htmlResponse = errorParser.parseFromString(errorMessage, 'text/html')
                  const errorText = htmlResponse.getElementsByClassName('message')
                  const errorInnerText = errorText[0].innerText
                  const errorList = errorInnerText.split(',')
                  setErrorList(errorList)

                  console.log('errorList', errorList);
                })
    }

    async function createPlayerTable() {
      await axios.post(`${process.env.REACT_APP_TRIVIA_SERVER_BASEURL}/players`, {
        userUuid: uuid,
        username: username
      }).then(response => {
        if (response.data.status === 'created') {
          console.log('response data', response.data)
          console.log('created player account.')
        }
      }).catch(error => {
        console.log('player account registration error', error);
      })
    }

    Promise.all([createNewAccount(), createPlayerTable()])
      .then((response) => {
        createGamesTable();
      });
  }


  async function createGamesTable() {
    await axios.post(`${process.env.REACT_APP_TRIVIA_SERVER_BASEURL}/games`, {
      userUuid: uuid,
      totalQuestions: 0,
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0
    }).then(response => {
      if (response.data.status === 'created') {
        console.log('created games table.')
      }
    }).catch(error => {
      console.log('games table setup error', error);
    })
  }

  // Generate a custom key; Credit: https://stackoverflow.com/a/39549510
  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  }

  return (
    <>
      <section className="block step-1-form hero is-dark is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h3 className="title has-text-white">Sign Up</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-white">
                Please register to proceed.
              </p>

              <p className="subtitle has-text-warning">
                Your password is encrypted and securely stored. It will not be shared with anyone, or used for any purpose other than to log you in.
              </p>
              <p className="subtitle has-text-warning">
                Your username will be used to identify you to other users.
              </p>

              <div className="box">
                {errorList ? <h2 className="has-text-danger error-list">{errorList.map((error, key) => {
                  return (
                    <li key={generateKey(error)}>{error}</li>)
                })}</h2> : null}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="field">

                    <div className="control">
                      <input
                        className="input is-large"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoComplete="email"
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
                        autoComplete="new-password"
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


                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Your Password"
                        autoComplete="new-password"
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        ref={register({
                          required: "Passwords must match",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                          },
                        })}
                      />
                      {errors.password_confirmation && (
                        <p className="error-message">{errors.password_confirmation.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="text"
                        name="username"
                        placeholder="Choose a Unique Username"
                        autoComplete="username"
                        autoFocus=""
                        onChange={event => setUsername(event.target.value)}
                        ref={register({
                          required: 'You must select a unique username.',
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: 'Usernames should contain only numbers and letters.'
                          }
                        })}
                      />
                      {errors.username && (
                        <p className="error-message">{errors.username.message}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="button is-block is-info is-large is-fullwidth"
                  >
                    Sign Me Up!{" "}
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>

                </form>
              </div>
            </div>
            <p className="has-text-white">
              <Link to="/login"> Login </Link> |
              <Link to="/"> Forgot Password </Link>
            </p>
          </div>
        </div>
      </section >
    </>
  );
}

export default Register;
