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
import { authenticate } from './store/session';
import UserServers from './components/servers/ServerIndex';
import PrivateChats from './components/private-chats/privateChat';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
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
          <UserServers />
          <PrivateChats />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId' exact={true} >
          <ServerIndexItem />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Redirect to='/@me'></Redirect>
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
