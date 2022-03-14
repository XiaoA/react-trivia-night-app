import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Register.css";
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Register = ({ handleLogin, isLoggedIn }) => {
  const [formStep, setFormStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [userId, setUserId] = useState(0)
  const [username, setUsername] = useState('');

  // let location = useLocation();
  let history = useHistory();

  //  Redirect Authenticated users from Register form
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard")
    }
  }, [isLoggedIn, history]);


  // Move through form steps
  function completeFormStep() {
    setFormStep(formStep + 1)
  }

  // On submit
  const onSubmit = (data, event) => {
    completeFormStep();
  }

  // Initialize React Hook Form
  const { register, handleSubmit, errors, formState = { errors } } = useForm({
    mode: "onBlur"
  })

  // Handle Registration (Step One)
  const handleStepOneRegistration = (data) => {
    setUserId(data.user.id) // see App.js handLogin()
    handleLogin(data);
  }

  // Step Two: Confirm and Complete Registration
  function completeRegistration(data) {
    function createNewAccount() {
      axios.post(`${process.env.REACT_APP_AUTHENTICATION_BASEURL}/registrations`, {
        user: {
          email,
          username,
          password,
          password_confirmation
        }
      },
        { withCredentials: true }
      ).then(response => {
        if (response.data.status === 'created') {
          handleStepOneRegistration(response.data)
        }
      }).catch(error => {
        console.log('registration error', error);
      })
    }


    Promise.all([createNewAccount()])
      .then((response) => {
        history.push("/dashboard")
      });
  }

  return (
    <>
      {formStep === 1 && (
        <section className={formStep === 1 ? "block step-1-form hero is-dark is-fullheight" : "hidden"}>
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


                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-large"
                          type="password"
                          name="password_confirmation"
                          placeholder="Confirm Your Password"
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
                      Next Step{" "}
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
      )}

      {formStep === 2 && (
        <section className={formStep === 2 ? "block step-2-form hero is-dark is-fullheight" : "hidden"}>
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-white">Youre all set.</h3>
                <hr className="login-hr" />
                <p className="subtitle has-text-white">
                  If everything looks good...
                  {email} | {username}
                </p>
                <div className="box">
                  <button onClick={completeRegistration}
                    type="submit"
                    className="button is-block is-info is-large is-fullwidth"
                  >
                    Sign Me Up!{" "}
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Register;
