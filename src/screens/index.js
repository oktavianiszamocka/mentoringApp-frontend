import React, { useState } from 'react';
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
import ProjectFormBoard from './ProjectForm/ProjectFormDashboard';
import InvitationPage from './Invitations/InvitationPageFull';
import Signup from './shared/components/Signup';
import TaskDashboard from './ProjectForm/TaskPage/TaskDashborad';
import TaskDetail from './ProjectForm/TaskPage/TaskDetail';
import CalendarMain from './shared/Calendar/CalendarMain';
// const renderRoute = (route) => <Route key={route.path} {...route} />;
import UseToken from './UseToken';
/*
function setToken(userToken) {
  localStorage.setItem('token', userToken);
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = tokenString;
  return userToken;
}
*/

const App = () => {
  const { token, setToken } = UseToken();
  // const token = getToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/mainpage" />} />
        <Route path="/login" component={Login} />
        <Route path={['/reset-password', '/register']} component={UpsertPassword} />
        <Route path="/mainpage" component={StudentDashboard} />
        <Route path="/profile/:IdUser" component={MyProfileDashboard} />
        <Route path="/message" component={Message} />
        <Route path="/edit-profile/:IdUser" component={EditForm} />
        <Route path="/myproject" component={MyProject} />
        <Route path="/project-members/:IdProject" component={ProjectMembersBoard} />
        <Route path="/project-detail/:IdProject" component={ProjectDetailsDashboard} />
        <Route path="/project-promoters/:IdProject" component={ProjectPromotersBoard} />
        <Route path="/project-form" component={ProjectFormBoard} />
        <Route path="/invitations" component={InvitationPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/task" component={TaskDashboard} />
        <Route path="/task-detail" component={TaskDetail} />
        <Route path="/calendar" component={CalendarMain} />
      </Switch>
    </BrowserRouter>

  );
};

export default App;
