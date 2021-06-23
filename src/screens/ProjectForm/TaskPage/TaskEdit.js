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
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
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
   font-size: 15px;
   font-weight: bold;
   width: 160px;
`;
const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #616366;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #616366;
  margin: 0px;
`;

const StyledDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: black;
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
  },
  grid: {
    marginBottom: '-15px',
  },
  title: {
    marginBottom: '15px',
    width: '200px',
  },
  resize: {
    fontSize: '13px',
  },
  description: {
    marginBottom: '10px',
    marginTop: '20px',
    width: '230px',
  },
  prioritySelect: {
    width: '140px',
    marginLeft: '20px',
    fontSize: '13px',
    marginTop: '5px',

  },
  resize2: {
    fontSize: '13px',
    marginLeft: '7px',
  },
  datepick: {
    width: '180px',
    marginLeft: '10px',
    fontSize: '10px',
    marginTop: '6px',

  },
  datepick2: {
    width: '168px',
    marginLeft: '10px',
    fontSize: '10px',
    marginTop: '6px',

  },
}));

const TaskEdit = (props) => {
  const classes = useStyles();

  // const taskid = props.idT;
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCreator, setTaskCreator] = useState('');
  const [taskCreatedOn, setTaskCreatedOn] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [taskStatus, setTaskStatus] = useState();
  const [taskEnd, setTaskEnd] = useState();
  const [taskStart, setTaskStart] = useState();

  /* useEffect(() => {
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
  }, []); */

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

  const styles = {
    position: 'absolute',
    zIndex: 5,
  };

  return (
    <StyledDiv style={styles}>
      <Grid container direction="row" className={classes.grid}>
        <Grid item>
          <TextField
            label="Enter title"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            className={classes.title}

          />
        </Grid>
        <CloseIcon className={classes.close} onClick={() => props.showDet()} />
        <Grid item />
      </Grid>
      <TextField
        label="Enter description"
        className={classes.description}
        multiline
        rows={3}
        InputProps={{
          classes: {
            input: classes.resize,
          },
        }}
        variant="outlined"
      />
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>PRIORITY</StyledUnderTitle>
        </Grid>
        <Grid item>
          <Select
            className={classes.prioritySelect}
          >
            <MenuItem
              className={classes.resize}
              value="Low"
            >
              Low

            </MenuItem>
            <MenuItem
              className={classes.resize}
              value="Medium"
            >
              Medium

            </MenuItem>
            <MenuItem
              className={classes.resize}
              value="High"
            >
              High

            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>ASIGNEES</StyledUnderTitle>
        </Grid>
        <Grid item>
          <Select
            className={classes.prioritySelect}
          >
            <MenuItem
              className={classes.resize}
              value="Low"
            >
              Low

            </MenuItem>
            <MenuItem
              className={classes.resize}
              value="Medium"
            >
              Medium

            </MenuItem>
            <MenuItem
              className={classes.resize}
              value="High"
            >
              High

            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>STATUS</StyledUnderTitle>
        </Grid>
        <Grid item>
          <Grid item>
            <Select
              className={classes.prioritySelect}
            >
              <MenuItem
                className={classes.resize}
                value="To do"
              >
                To do

              </MenuItem>
              <MenuItem
                className={classes.resize}
                value="In process"
              >
                In process

              </MenuItem>
              <MenuItem
                className={classes.resize}
                value="Done"
              >
                Done

              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>DEADLINE</StyledUnderTitle>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                className={classes.datepick}
                InputProps={{
                  classes: {
                    input: classes.resize2,
                  },
                }}
                variant="inline"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Divider />

      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>START DATE</StyledUnderTitle>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                className={classes.datepick2}
                InputProps={{
                  classes: {
                    input: classes.resize2,
                  },
                }}
                variant="inline"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default TaskEdit;
