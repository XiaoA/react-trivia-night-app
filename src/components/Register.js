import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Register.css";
import axios from 'axios';
import { useForm } from 'react-hook-form';


const Register = ({ handleLogin, handleLogout, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [userId, setUserId] = useState(0)
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');

  let location = useLocation();
  let history = useHistory();

  // Redirect Authenticated users from Register form
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard")
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    setUserId(location.userId);
    setEmail(location.email);
  }, [location]);

  
  const handleSuccessfulRegistration = (data) => {
    setUserId(data.user.id)
    handleLogin(data);
  }

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  })

  const onSubmit = (data, event) => {
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
        handleSuccessfulRegistration(response.data)
      }
    }).catch(error => {
      console.log('registration error', error);
    })
  }


  // Promise.all([registerNewAccount()])
  //   .then((response) => {
  //     console.log('succcess')
  //     history.push("/dashboard")
  //   });
 

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
                        placeholder="Your Password"
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


                  <button
                    type="submit"
                    className="button is-block is-info is-large is-fullwidth"
                  >
                    Submit{" "}
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>

        <p className="has-text-white">
          <Link to="/login"> Login </Link>
          <Link to="/"> Forgot Password </Link>
        </p>


      </section >
    </>
  );
}
export default Register;
