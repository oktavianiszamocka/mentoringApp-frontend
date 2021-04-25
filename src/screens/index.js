import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import StudentDashboard from './Student/StudentDashboard';
import MyProfileDashboard from './Profile/MyProfileDashboard';
import Message from './MessagePage/MessagePage';
import EditForm from './Profile/EditFormDashboard';
// import Admin from './Admin/routes';
import Login from './Auth/Login';
import UpsertPassword from './Auth/UpsertPassword';
import MyProject from './MyProject/myProject';
import ProjectDetailsDashboard from './MyProject/ProjectDetailsDashboard';
import ProjectMembersBoard from './ProjectMembers/projectMembers';
import ProjectPromotersBoard from './ProjectPromoters/promotersPage';
import MilestoneDashboard from './Milestone/MilestoneDashboard';


import ProjectFormBoard from './ProjectForm/ProjectFormDashboard';
// const renderRoute = (route) => <Route key={route.path} {...route} />;

const App = () => (

  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/mainpage" />} />
      <Route path="/login" component={Login} />
      <Route path={['/reset-password', '/register']} component={UpsertPassword} />
      <Route path="/mainpage" component={StudentDashboard} />
      <Route path="/profile/:IdUser" component={MyProfileDashboard} />
      <Route path="/message" component={Message} />
      <Route path="/editProfile/:IdUser" component={EditForm} />
      <Route path="/myproject" component={MyProject} />
      <Route path="/projectmembers/:IdProject" component={ProjectMembersBoard} />
      <Route path="/projectDetails/:IdProject" component={ProjectDetailsDashboard} />
      <Route path="/projectpromoters/:IdProject" component={ProjectPromotersBoard} />
      <Route path="/projectForm" component={ProjectFormBoard} />
      <Route path="/milestone" component={MilestoneDashboard} />
    </Switch>
  </BrowserRouter>

);

export default App;
