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
import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: relative;
  padding: 2rem;
  min-Height: 30rem;
  width: 25rem;
  height: auto;
  border-radius: 5px;
  border: 1px solid #9e9e99;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 20px;
   font-weight: bold;
   width : 100%;
   margin-Top : 1rem;
   margin-Left : 6rem;
  
`;
const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 16px;
   font-weight: bold;
   color: #616366;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 14px;
  color: #616366;
  margin: 0px;
`;

const StyledDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 13px;
  color: black;
`;

const useStyles = makeStyles((theme) => ({
  avatar1: {
    fontSize: '30px',
    marginRight: '5px',
    marginTop: '-5px',
  },
  avatar2: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: '5px',
    marginTop: '-5px',
    marginBottom: '5px',

  },
  close: {
    fontSize: '30px',
    marginLeft: '10rem',
  },
  grid: {
    margin: 'auto',

  },
  assignee: {
    height: '20rem',

  },

}));

const TaskDetail = (props) => {
  const classes = useStyles();

  const taskid = props.idT;
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCreator, setTaskCreator] = useState('');
  const [taskCreatedOn, setTaskCreatedOn] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [taskStatus, setTaskStatus] = useState();
  const [taskEnd, setTaskEnd] = useState();
  const [taskStart, setTaskStart] = useState();

  useEffect(() => {
    const loadData = async () => {
      const res = await Promise.all([Api.getTaskDetails(taskid)]);
      setTaskTitle(res[0].data.data.title);
      setTaskDescription(res[0].data.data.description);
      setTaskCreator(res[0].data.data.creatorUser);
      setTaskCreatedOn(res[0].data.data.createdOn);
      setTaskPriority(res[0].data.data.priority);
      setAssignedUsers(res[0].data.data.assignedUser);
      setTaskStatus(res[0].data.data.statusName);
      setTaskEnd(res[0].data.data.expectedEndDate);
      setTaskStart(res[0].data.data.startDate);
    };

    loadData();
  }, []);

  const changeDateFormat = (dat) => {
    if (dat == null) {
      return 'Not set';
    }
    const date = new Date(dat);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) { dd = `0${dd}`; }
    if (mm < 10) { mm = `0${mm}`; }
    const d = `${dd}/${mm}/${yyyy}`;
    return d;
  };

  return (
    <StyledDiv>
      <Grid container direction="row" className={classes.grid} space={2}>
        <Grid item xs={5}>
          <StyledTitle>{taskTitle}</StyledTitle>
        </Grid>
        <Grid item>
          <CloseIcon className={classes.close} onClick={() => props.showDet()} />
        </Grid>

      </Grid>
      <StyledUnderTitle>Created by:</StyledUnderTitle>
      <Grid container direction="row">
        <Grid item>
          <MaterialAvatar
            className={classes.avatar1}
            src={taskCreator.imageUrl}
          />
        </Grid>
        <Grid item>
          <div>
            <StyledP>
              {taskCreator.firstName}
              {' '}
              {taskCreator.lastName}
            </StyledP>
            <StyledP>{changeDateFormat(taskCreatedOn)}</StyledP>
          </div>
        </Grid>
      </Grid>
      <StyledDescription>{taskDescription}</StyledDescription>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>PRIORITY</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '50px', textTransform: 'uppercase' }}>{taskPriority}</StyledUnderTitle>
        </Grid>
      </Grid>
      <Divider />
      <StyledUnderTitle>ASIGNEES</StyledUnderTitle>

      {assignedUsers.length > 0 ? (
        assignedUsers.map((item) => (
          <Grid container direction="row" spacing={2}>

            <Grid item>
              <MaterialAvatar
                className={classes.avatar2}
                src={item.imageUrl}
              />
            </Grid>
            <Grid item>
              <div>
                <StyledP style={{ marginTop: '2px' }}>
                  {item.firstName}
                  {' '}
                  {item.lastName}
                </StyledP>
              </div>
            </Grid>

          </Grid>

        ))) : (
          <div />
      )}

      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>Status</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '15px' }}>{taskStatus}</StyledUnderTitle>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>Start date</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '15px' }}>{changeDateFormat(taskStart)}</StyledUnderTitle>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>Deadline</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '15px' }}>{changeDateFormat(taskEnd)}</StyledUnderTitle>
        </Grid>
      </Grid>

    </StyledDiv>
  );
};

export default TaskDetail;
