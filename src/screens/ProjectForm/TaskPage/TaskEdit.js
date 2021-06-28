import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
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
import {
  Formik, Form, Field, ErrorMessage, FieldArray,
} from 'formik';
import * as Yup from 'yup';
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
    width: '225px',
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
  button: {
    marginLeft: '85px',
    marginTop: '8px',
  },
}));

const TaskEdit = (props) => {
  const classes = useStyles();

  const [statuses, setStatuses] = useState([]);
  const [asignees, setAsignees] = useState([]);
  const [taskDeadline, settaskDeadline] = React.useState(new Date('2021-06-10T21:11:54'));
  const [taskStart, settaskStart] = React.useState(new Date('2021-06-10T21:11:54'));

  const { taskInfo } = props;

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  };

  const handleDeadlineChange = (date) => {
    const dateNew = moment(date).format('DD.MM.YYYY');
    settaskDeadline(dateNew);
  };

  const handleStartChange = (date) => {
    const dateNew = moment(date).format('DD.MM.YYYY');
    settaskStart(dateNew);
  };

  const getTaskStatuses = async () => {
    const res = await Promise.all([Api.getTasksStatuses()]);
    setStatuses(res[0].data.data);
  };

  const getTaskAsignees = async () => {
    const res = await Promise.all([Api.getTasksAsignees()]);
    setAsignees(res[0].data.data);
  };

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

  const closeAdd = () => {
    props.close(true);
  };

  useEffect(() => {
    const loadData = async () => {
      getTaskStatuses();
      getTaskAsignees();
    };

    loadData();
  }, []);

  const onTaskAddHandler = async (taskData) => {
    await Api.createTask(taskData)
      .then(async () => {
        props.close(false);
        const res = await Promise.all([Api.getProjectTasks(5)]);
      });
  };

  const initialValues = {
    title: taskInfo.title,
    status: taskInfo.status,
    description: props.description,
    startDate: taskInfo.startDate,
    expectedEndDate: taskInfo.expectedEndDate,
    project: 5,
    creator: 9,
    createdOn: taskInfo.createdOn,
    priority: taskInfo.priority,
    assignedUsers: taskInfo.assignedUsers,
  };

  const onSubmit = (values) => {
    const assgined = [];
    assgined.push(values.assignedUsers);
    const taskData = {
      title: values.title,
      status: values.status,
      description: values.description,
      startDate: taskStart,
      expectedEndDate: taskDeadline,
      project: 5,
      creator: 9,
      createdOn: '2021-06-11',
      priority: values.priority,
      assignedUsers: assgined,
    };
    onTaskAddHandler(taskData);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validator={() => ({})}

    >
      <StyledDiv style={styles}>
        <Form>
          <Grid container direction="row" className={classes.grid}>
            {console.log(props.description)}
            <Grid item>

              <Field
                as={TextField}
                id="title"
                name="title"
                label="Enter title"
                type="search"
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                className={classes.title}
              />
            </Grid>
            <CloseIcon className={classes.close} onClick={() => props.showEdit()} />
            <Grid item />
          </Grid>
          <Field
            as={TextField}
            id="description"
            name="description"
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
              <Field
                as={Select}
                type="text"
                name="priority"
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

              </Field>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row">
            <Grid item>
              <StyledUnderTitle>ASIGNEES</StyledUnderTitle>
            </Grid>
            <Grid item>
              <Field
                as={Select}
                type="text"
                name="assignedUsers"
                className={classes.prioritySelect}
              >
                {asignees ? (
                  asignees.map((asignee) => (
                    <MenuItem
                      className={classes.resize}
                      value={asignee.idUser}
                    >
                      {asignee.firstName}
                      {' '}
                      {asignee.lastName}
                    </MenuItem>
                  ))) : (
                    <div />

                )}
              </Field>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row">
            <Grid item>
              <StyledUnderTitle>STATUS</StyledUnderTitle>
            </Grid>
            <Grid item>
              <Grid item>
                <Field
                  as={Select}
                  type="text"
                  name="status"
                  className={classes.prioritySelect}
                >
                  {statuses ? (
                    statuses.map((status) => (
                      <MenuItem
                        className={classes.resize}
                        value={status.value}
                      >
                        {status.label}
                      </MenuItem>
                    ))) : (
                      <div />

                  )}
                </Field>
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
                  <Field
                    as={KeyboardDatePicker}
                    disableToolbar
                    className={classes.datepick}
                    InputProps={{
                      classes: {
                        input: classes.resize2,
                      },
                    }}
                    variant="inline"
                    format="MM/dd/yyyy"
                    value={taskDeadline}
                    onChange={handleDeadlineChange}
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
                    value={taskStart}
                    onChange={handleStartChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />

                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </Form>
      </StyledDiv>
    </Formik>

  );
};

export default TaskEdit;
