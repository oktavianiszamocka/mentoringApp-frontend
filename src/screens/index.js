import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import StudentDashboard from './Student/StudentDashboard';
import MyProfileDashboard from './Profile/MyProfileDashboard';
import Message from './MessagePage/MessagePage';

// import Admin from './Admin/routes';
import Login from './Auth/Login';
import UpsertPassword from './Auth/UpsertPassword';
import MyProject from './MyProject/myProject';

// const renderRoute = (route) => <Route key={route.path} {...route} />;

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/mainpage" />} />
      <Route path="/login" component={Login} />
      <Route path={['/reset-password', '/register']} component={UpsertPassword} />
      <Route path="/mainpage" component={StudentDashboard} />
      <Route path="/profile" component={MyProfileDashboard} />
      <Route path="/message" component={Message} />
      <Route path="/myproject" component={MyProject} />
    </Switch>
  </BrowserRouter>
);

export default App;
