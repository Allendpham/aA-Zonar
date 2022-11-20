import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import ErrorDisplay from './ErrorDisplay';
import "./login.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let randInd;

  const profilePicArr = [
    "https://i.imgur.com/hqaxlhA.png",
    "https://i.imgur.com/oYJZeqX.png",
    "https://i.imgur.com/T7RAT9x.png",
    "https://i.imgur.com/7CLZbES.png",
    "https://i.imgur.com/RBj7WlI.png",
  ];
  const randPic = () => Math.floor(Math.random() * profilePicArr.length);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {

      const data = await dispatch(signUp(username, email, password, profilePic));
      if (data) {
        setErrors(data)
      }
    }
    else {
     setErrors(['Passwords do not match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImage = (e) => setProfilePic(e.target.value);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <form className='signup-form' onSubmit={onSignUp}>
        <div>
        <ErrorDisplay id={'signup-error-list'} errors={errors}/>
        </div>
        <h2 className="login-welcome">Create an account</h2>
        <div className='signup-form-body'>
          <div>
            <label className='login-text'>USERNAME</label>
            <input
              className="login-input"
              id='sign-up-username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label className='login-text'>EMAIL</label>
            <input
              className="login-input"
              id='sign-up-email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <lable className='login-text'>PROFILE PICTURE</lable>
            <input
                className="login-input"
                id='sign-up-profile-pic'
                type='text'
                name='profilePic'
                value={profilePic}
                onChange={updateImage}/>
          </div>
          <div>
            <label className='login-text'>PASSWORD</label>
            <input
              className="login-input"
              id='sign-up-password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label className='login-text'>CONFIRM PASSWORD</label>
            <input
              className="login-input"
              type='password'
              id='sign-up-confirm-password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
        </div>
        <button className='login-submit' type='submit'>Continue</button>
        <Link className="signup-link" to={`/login`}>
            Already have an account?
          </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
