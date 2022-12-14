import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import ErrorDisplay from './ErrorDisplay';
import "./login.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = (email, password) =>{
    setEmail(email)
    setPassword(password)
  }
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={onLogin}>
        <div>
        <ErrorDisplay id={'login-error-list'} errors={errors}/>
        </div>
        <h2 className="login-welcome">Welcome Back!</h2>
        <h3 className="login-subheading">We're so excited to see you again!</h3>
        <div className="login-text-div">
          <label htmlFor="email">
            <p className="login-text">EMAIL</p>
          </label>

          <input
            className="login-input"
            id='login-email'
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login-text-div">
          <label htmlFor="password">
            <p className="login-text">PASSWORD</p>
          </label>

          <input
            className="login-input"
            id='login-password'
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
          <br />
        </div>
          <button id='login-form-submit' className='login-submit' type="submit">Log in</button>
          <button className='login-submit' onClick={() => {loginDemo('kyle@aa.io', 'password')}}>Login Demo User 1</button>
          <button className='login-submit' onClick={() => {loginDemo('demo@aa.io', 'password')}}>Login Demo User 2</button>

        <p className='register'>
          Need an account?{" "}
          <Link className="signup-link" to={`/sign-up`}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
