import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import MaterialAvatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Api from '../../../api/index';
import MeetingEdit from './MeetingEdit';

const StyledDiv = styled.div`
  background-color: white;
  position: absolute;
  max-width: 250px;
  max-height: 450px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #9e9e99;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 16px;
   font-weight: bold;
   width: 170px;
   color: #4f5052;

`;
const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #4f5052;
`;

const StyledUnderTitleGoing = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #4f5052;
   margin-right: 20px;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;
  margin: 0px;
`;

const StyledTime = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;
`;

const StyledDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;

`;

const useStyles = makeStyles((theme) => ({
  avatar1: {
    fontSize: '30px',
    marginRight: '5px',
    marginTop: '-5px',
  },
  avatar2: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '5px',
    marginTop: '-5px',
    marginBottom: '5px',

  },
  close: {
    fontSize: '20px',
    marginLeft: '10px',
  },
  edit: {
    fontSize: '18px',
    marginLeft: '30px',
  },
  grid: {
    marginBottom: '-15px',
  },
  buttons_blue: {
    padding: '2px',
    fontSize: '10px',
    marginTop: '10px',
    marginLeft: '5px',
  },
  buttons_white: {
    padding: '2px',
    fontSize: '10px',
    marginTop: '10px',
    marginLeft: '5px',
    backgroundColor: 'white',
  },
  assignee_grid: {
    marginBottom: '4px',
  },
  attendIcons: {
    fontSize: '18px',
  },
}));

const MeetingDetail = (props) => {
  const classes = useStyles();
  const positionX = `${props.cardPosition[0]}`;
  const positionY = `${props.cardPosition[1]}`;

  const [editMeetingVisible, setEditMeetingVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [location, setLocation] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [attendanceId, setAttendanceId] = useState([]);
  const [assignedUsersForEdit, setAssignedUsersForEdit] = useState([]);
  const [loggedUserAttend, setloggedUserAttend] = useState(false);
  const [userProjects, setUserProjects] = useState([]);

  // let loggedUserAttend = false;

  const styles = {
    top: '150px',
    left: '450px',
    position: 'absolute',
    zIndex: 5,
  };

  const getUserProjects = async () => {
    const res = await Promise.all([Api.getUserProject()]);
    setUserProjects(res[0].data.data);
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await Promise.all([Api.getMeetingDetail(props.meetingId)]);
      setTitle(res[0].data.data.title);
      setDescription(res[0].data.data.description);
      setStart(res[0].data.data.startTime);
      setEnd(res[0].data.data.endTime);
      setLocation(res[0].data.data.location);
      setAssignedUsers(res[0].data.data.meetingAttendee);
      setAttendanceId(res[0].data.data.meetingAttendee.find((x) => x.idUser == Api.getUserId()).idAttendence);
      setloggedUserAttend(res[0].data.data.meetingAttendee.find((x) => x.idUser == Api.getUserId()).isAttend);
    };

    loadData();
  }, [props.meetingId]);

  const showEdit = () => {
    setEditMeetingVisible(true);
  };

  const acceptMeeting = async () => {
    const attendanceAccept = {
      idAttendence: attendanceId,
      user: 9,
      isAttend: true,
    };
    await Promise.all([Api.updateMeetingAttendance(attendanceAccept)]).then(async () => {
      const res = await Promise.all([Api.getMeetingDetail(props.meetingId)]);
      setTitle(res[0].data.data.title);
      setDescription(res[0].data.data.description);
      setStart(res[0].data.data.startTime);
      setEnd(res[0].data.data.endTime);
      setLocation(res[0].data.data.location);
      setAssignedUsers(res[0].data.data.meetingAttendee);
      setAttendanceId(res[0].data.data.meetingAttendee.find((x) => x.idUser == Api.getUserId()).idAttendence);
      setloggedUserAttend(true);
    });
  };

  const declineMeeting = async () => {
    const attendanceDecline = {
      idAttendence: attendanceId,
      user: 9,
      isAttend: false,
    };
    await Promise.all([Api.updateMeetingAttendance(attendanceDecline)]).then(async () => {
      const res = await Promise.all([Api.getMeetingDetail(props.meetingId)]);
      setTitle(res[0].data.data.title);
      setDescription(res[0].data.data.description);
      setStart(res[0].data.data.startTime);
      setEnd(res[0].data.data.endTime);
      setLocation(res[0].data.data.location);
      setAssignedUsers(res[0].data.data.meetingAttendee);
      setAttendanceId(res[0].data.data.meetingAttendee.find((x) => x.idUser == Api.getUserId()).idAttendence);
      setloggedUserAttend(false);
    });
  };

  // setLogged();

  return (
    <StyledDiv style={styles}>
      <Grid container direction="row" className={classes.grid}>
        <Grid item>
          <StyledTitle>{title}</StyledTitle>
        </Grid>
        <EditIcon
          className={classes.edit}
          onClick={showEdit}
        />
        <CloseIcon className={classes.close} onClick={() => props.showDet()} />
      </Grid>
      <StyledUnderTitle>TIME</StyledUnderTitle>
      <StyledTime>
        {start}
        {' '}
        -
        {' '}
        {end}
      </StyledTime>
      <Divider />

      <StyledUnderTitle>DESCRIPTION</StyledUnderTitle>
      <StyledDescription>{description}</StyledDescription>
      <Divider />
      <StyledUnderTitle>LOCATION</StyledUnderTitle>
      <StyledDescription>{location}</StyledDescription>
      <Divider />
      <Grid container direction="row">
        <StyledUnderTitle>ASIGNEES</StyledUnderTitle>
        {assignedUsers.length > 0 ? (
          assignedUsers.map((item) => (
            <Grid container direction="row" className={classes.assignee_grid}>
              <Grid item>
                <MaterialAvatar
                  className={classes.avatar2}
                  src={item.imageUrl}
                />
              </Grid>
              <Grid item>
                <div>
                  <StyledP style={{ marginTop: '2px', width: '170px' }}>
                    {item.firstName}
                    {' '}
                    {item.lastName}
                  </StyledP>
                </div>
              </Grid>
              <Grid item>
                {item.isAttend === true ? (
                  <CheckIcon color="primary" className={classes.attendIcons} />

                ) : item.isAttend === false ? (
                  <ClearIcon color="primary" className={classes.attendIcons} />
                )
                  : <HelpOutlineIcon color="primary" className={classes.attendIcons} />}
              </Grid>
            </Grid>
          ))) : (
            <div />
        )}
        {editMeetingVisible && (
        <MeetingEdit
          close={setEditMeetingVisible}
          closeDetail={props.showDet}
          meetingId={props.meetingId}
          meetingTitle={title}
          meetingDescription={description}
          date={props.date}
          startTime={start}
          endTime={end}
          meetingLocation={location}
          attendees={assignedUsers}
          setMeetings={props.setMeetings}
        />
        )}
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitleGoing>GOING?</StyledUnderTitleGoing>
        </Grid>
        <Grid item>
          { loggedUserAttend ? (
            <Grid container direction="row">
              <Grid item>
                <Button size="small" variant="contained" color="primary" className={classes.buttons_blue} onClick={acceptMeeting}>YES</Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="contained" className={classes.buttons_white} onClick={declineMeeting}>NO</Button>
              </Grid>
            </Grid>
          ) : loggedUserAttend === false ? (
            <Grid container direction="row">
              <Grid item>
                <Button size="small" variant="contained" className={classes.buttons_white} onClick={acceptMeeting}>YES</Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="contained" color="primary" className={classes.buttons_blue} onClick={declineMeeting}>NO</Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="row">
              <Grid item>
                <Button size="small" variant="contained" className={classes.buttons_white} onClick={acceptMeeting}>YES</Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="contained" className={classes.buttons_white} onClick={declineMeeting}>NO</Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default MeetingDetail;
