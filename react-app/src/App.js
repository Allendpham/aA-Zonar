import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/splashpage/SplashPage';
import ServersIndex from './components/servers/ServerIndex/ServerIndex';
import ServerPage from './components/servers/ServerPage';
import { authenticate } from './store/session';
import PrivateChats from './components/private-chats/privateChat';
import { loadPrivateChatsThunk } from './store/privatechat';
import UserAccount from './components/users/userAccount';
import ChannelBar from './components/channel-bar/Channel-bar';

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
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/@me" exact={true}>
          <ServersIndex />
          <ChannelBar />
          <PrivateChats/>
        </ProtectedRoute>
        <ProtectedRoute path="/servers/:serverId" exact={true}>
          <ServersIndex />
          <ChannelBar />
          <ServerPage />
        </ProtectedRoute>
        <ProtectedRoute path='/@me/settings'>
          < UserAccount />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
