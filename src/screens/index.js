import React, { useState } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch, withRouter, useLocation,
} from 'react-router-dom';
import StudentDashboard from './Student/StudentDashboard';
import MyProfileDashboard from './Profile/MyProfileDashboard';
import Message from './MessagePage/MessagePage2';
import EditForm from './Profile/EditFormDashboard';
// import Admin from './Admin/routes';
import Login from './Auth/Login';
import ForgottenPassword from './Auth/ForgottenPassword';
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
import TaskAdd from './ProjectForm/TaskPage/TaskAdd';
import CalendarMain from './shared/Calendar/CalendarMain';
import Milestone from './Milestone/MilestoneDashboard';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import MessageItem from './MessagePage/MessageItem';
// const renderRoute = (route) => <Route key={route.path} {...route} />;
import UseToken from './UseToken';
import EditProjectFormDashboard from './ProjectForm/EditFormDashboard';
import ChangePassword from './Auth/ChangePassword';
import MeetingList from './shared/components/MeetingList';
import MeetingDetail from './shared/components/MeetingDetail';
import CalendarMainProject from './shared/Calendar/ProjectCalendar/CalendarMainProject';

const App = () => {
  const { token, setToken } = UseToken();
  const { refreshToken, setRefreshToken } = UseToken();
  const { idUser, setIdUser } = UseToken();
  const { userRole, setUserRole } = UseToken();
  const { pathname } = window.location;

  if (!token && pathname !== '/signup' && pathname !== '/forgot-password' && pathname !== '/reset-password') {
    return (
      <Login
        setToken={setToken}
        setRefreshToken={setRefreshToken}
        setIdUser={setIdUser}
        setUserRole={setUserRole}
      />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/mainpage" />} />
        <Route path="/login" component={Login} />
        <Route path="/mainpage" component={StudentDashboard} />
        <Route path="/profile/:IdUser" component={MyProfileDashboard} />
        <Route path="/message" component={Message} />
        <Route path="/edit-profile/:IdUser" component={EditForm} />
        <Route path="/myproject" component={MyProject} />
        <Route path="/project-members/:IdProject" component={ProjectMembersBoard} />
        <Route path="/project-detail/:IdProject" component={ProjectDetailsDashboard} />
        <Route path="/project-promoters/:IdProject" component={ProjectPromotersBoard} />
        <Route path="/project-form" component={ProjectFormBoard} />
        <Route path="/edit-project/:IdProject" component={EditProjectFormDashboard} />
        <Route path="/invitations" component={InvitationPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/task/:IdProject" component={TaskDashboard} />
        <Route path="/task-detail" component={TaskDetail} />
        <Route path="/task-add" component={TaskAdd} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/milestones/:IdProject" component={Milestone} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/wall/:IdProject" component={StudentDashboard} />
        <Route path="/meeting_notes" component={MeetingList} />
        <Route path="/meeting_details" component={MeetingDetail} />
        <Route path="/mitem" component={MessageItem} />
        <Route path="/calendar/:IdProject" component={CalendarMainProject} />
      </Switch>
    </BrowserRouter>

  );
};

export default App;
