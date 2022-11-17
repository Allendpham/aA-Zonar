import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
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
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <h2 className="login-welcome">Welcome Back!</h2>
        <h3 className="login-subheading">We're so excited to see you again!</h3>
        <div className="login-text-div">
          <label htmlFor="email">
            <p className="login-text">Email</p>
          </label>
          
          <input
            className="login-input"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login-text-div">
          <label htmlFor="password">
            <p className="login-text">Password</p>
          </label>
          
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <br />
          <button className='login-submit' type="submit">Log in</button>
        </div>
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
