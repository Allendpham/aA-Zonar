import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ServersIndex from './components/servers/ServerIndex';
import ServerIndexItem from './components/servers/ServerIndexItem';
import SplashPage from './components/splashpage/SplashPage';
import ServersIndex from './components/servers/ServerIndex/ServerIndex';
import ServerPage from './components/servers/ServerPage';
import { authenticate } from './store/session';
import PrivateChats from './components/private-chats/privateChat';
import { loadPrivateChatsThunk } from './store/privatechat';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    dispatch(loadPrivateChatsThunk())
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/@me' exact={true} >
          <ServersIndex />
          <PrivateChats />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId' exact={true} >
          <ServerPage />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/' exact={true} >
          <Redirect to='/@me'></Redirect>
        </ProtectedRoute> */}
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
