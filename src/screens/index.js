import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import postsStore from 'src/stores/postsStore';
import authStore from 'src/stores/authStore';

import Header from 'src/screens/shared/components/Header';
import MessagePage from 'src/screens/MessagePage/MessagePage';
import Login from './Auth/Login';
import UpsertPassword from './Auth/UpsertPassword';
import MainPage from './MainPage/MainPage';

const stores = {
  postsStore,
  authStore,
};

const App = () => {
  return (
    <Provider {...stores}>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login} />
          <Route path={['/reset-password', '/register']} component={UpsertPassword} />
          <Route path="/main-page" component={MainPage} />
          <Route path="/message" component={MessagePage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
