import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import SignUpFormModal from '../SignUpFormModal';
import { render } from "react-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const renderSignUpButton = () => {
    if (!sessionUser) {
      return (
        <>
          <SignUpFormModal/>
        </>
      )
    }
  }

  const demoLogIn = () => {
    return dispatch(sessionActions.login({email:'jason@gmail.com', password:'password'}))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <>
      <div id="sign-in-form-panel">
        <div id="sign-in-form-box">
          <form onSubmit={handleSubmit} class="form">
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <div className="sign-in-field">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={'Email'}
                required
              />
            </div>
            <div className="sign-in-password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={'Password'}
                required
              />
            </div>
            <div id="log-in-button">
              <button type="submit">Log In</button>
            </div>
          </form>
          <div id="demo-user-log-in-button">
            <button onClick={demoLogIn}>Demo User Log In</button>
          </div>
          <div id="sign-up-button">
            {renderSignUpButton()}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;