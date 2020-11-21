import React, { Suspense } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { Provider, history } from './utils/storage/store';
import StudentDashboard from './Student/StudentDashboard';
import MyProfileDashboard from './Profile/MyProfileDashboard';
import Message from './MessagePage/MessagePage';

// import Admin from './Admin/routes';
import Login from './Auth/Login';
import UpsertPassword from './Auth/UpsertPassword';

// const renderRoute = (route) => <Route key={route.path} {...route} />;

const App = () => (
  <Provider>
    <Router history={history}>
      <Suspense fallback="loading">
        <Route path="/" exact render={() => <Redirect to="/mainpage" />} />
        <Route path="/login" component={Login} />
        <Route path={['/reset-password', '/register']} component={UpsertPassword} />
        <Route path="/mainpage" component={StudentDashboard} />
        <Route path="/profile" component={MyProfileDashboard} />
        <Route path = "/message" component={Message} />
        {/* <Route path="/admin" component={Admin} /> */}
        {/* {routes.map(renderRoute)} */}
      </Suspense>
    </Router>
  </Provider>
);

export default App;
