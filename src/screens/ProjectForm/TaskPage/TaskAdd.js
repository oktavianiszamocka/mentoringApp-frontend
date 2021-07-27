import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { KeyboardDatePicker } from 'material-ui-formik-components';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  Formik, Form, Field, ErrorMessage, FieldArray,
} from 'formik';
import * as Yup from 'yup';
import Chip from '@material-ui/core/Chip';
import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: absolute;
  max-width: 30rem;
  min-height: 25rem;
  max-height: 38rem;
  padding: 2rem;
  border-radius: 5px;
  border: 1px solid #9e9e99;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #616366;
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
    width: '25rem',

  },
  resize: {
    fontSize: '13px',
  },
  description: {
    marginBottom: '10px',
    marginTop: '20px',
    width: '25rem',
  },
  prioritySelect: {
    width: '15rem',
    alignContent: 'right',
    fontSize: '13px',
    marginTop: '5px',
    marginLeft: '6rem',

  },
  resize2: {
    fontSize: '13px',
    marginLeft: '7px',
  },
  datepick: {
    width: 'auto',
    height: '50%',
    marginLeft: '3rem',
    fontSize: '10px',
    marginTop: '1rem',

  },
  datepick2: {
    marginLeft: '4rem',
    fontSize: '10px',
    marginTop: '1rem',

  },
  button: {
    width: '50%',
    marginLeft: '6rem',
    marginTop: '8px',
  },
  formControl: {
    marginLeft: '6rem',
    marginTop: '5px',
    marginBottom: '5px',
    width: '15rem',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  header: {
    margin: 'auto',
    width: '50%',
  },
  fieldDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: '3rem',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

const TaskAdd = (props) => {
  const { IdProject } = useParams();
  const IdUser = Api.getUserId();
  const theme = useTheme();
  const classes = useStyles();

  const [statuses, setStatuses] = useState([]);
  const [asignees, setAsignees] = useState([]);
  const [taskDeadline, settaskDeadline] = React.useState(new Date());
  const [taskStart, settaskStart] = React.useState(moment());
  const [asigneeIds, setAsigneeIds] = React.useState([]);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setAsigneeIds(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setAsigneeIds(value);
  };

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

  const getNameIdPair = () => {
    const name_id = {};
    for (const asignee in asignees) {
      const name = asignees[asignee].firstName;
      const surname = asignees[asignee].lastName;
      const fullName = `${name} ${surname}`;
      const id = asignees[asignee].idUser;
      name_id[id] = fullName;
    }

    return name_id;
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
    props.close(false);
  };

  useEffect(() => {
    const loadData = async () => {
      getTaskStatuses();
      getTaskAsignees();
    };

    loadData();
  }, []);

  const onTaskAddHandler = async (taskData) => {
    console.log(taskData);
    await Api.createTask(taskData)
      .then(async () => {
        console.log('sucess');
        props.close(false);
        const res = await Promise.all([Api.getProjectTasks(5)]);
      });
  };

  const initialValues = {
    title: '',
    status: 1,
    description: '',
    startDate: new Date(),
    expectedEndDate: new Date(),
    project: IdProject,
    creator: IdUser,
    createdOn: new Date(),
    priority: 'Low',
    assignedUsers: [],
  };

  const onSubmit = async (values) => {
    const assgined = [];
    assgined.push(values.assignedUsers);
    const taskData = {
      title: values.title,
      status: values.status,
      description: values.description,
      startDate: values.startDate,
      expectedEndDate: values.expectedEndDate,
      project: IdProject,
      creator: IdUser,
      createdOn: new Date(),
      priority: values.priority,
      assignedUsers: asigneeIds,
    };
    // onTaskAddHandler(taskData);
    console.log(taskData);
    await Api.createTask(taskData)
      .then(async () => {
        console.log('sucess');
        props.close(false);
        const res = await Promise.all([Api.getProjectTasks(5)]);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validator={() => ({})}
    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty, isSubmitting, values, setFieldValue, handleReset,
        } = formik;
        return (
          <StyledDiv style={styles}>
            <Form>
              <Grid container direction="row" className={classes.grid}>
                <Typography variant="h5" className={classes.header}>Add New Task</Typography>

                <CloseIcon className={classes.close} onClick={closeAdd} />
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

                  <div className="classes.fieldDiv">
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
                  </div>
                </Grid>

              </Grid>
              <Divider />
              <Grid container direction="row">
                <Grid item>
                  <StyledUnderTitle>ASIGNEES</StyledUnderTitle>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Asignees</InputLabel>
                    <Field
                      as={Select}
                      type="text"
                      name="assignedUsers"
                      multiple
                      value={asigneeIds}
                      onChange={handleChange}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip key={value} label={getNameIdPair()[value]} className={classes.chip} />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {asignees.map((user) => (
                        <MenuItem key={user.idUser} value={user.idUser}>
                          {`${user.firstName} ${user.lastName}`}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider />
              <Grid container direction="row" spacing={2}>
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
                  <StyledUnderTitle>DEADLINE DATE</StyledUnderTitle>
                </Grid>
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <Field
                        className={classes.datepick}
                        size="small"
                        component={KeyboardDatePicker}
                        name="expectedEndDate"
                        label="Deadline Date"
                        format="dd/MM/yyyy"
                        clearable
                        autoOk

                        inputVariant="outlined"
                        error={!!(errors.taskDeadline && touched.taskDeadline)}
                        helperText={errors.taskDeadline && touched.taskDeadline ? errors.taskDeadline : null}
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
                      <Field
                        className={classes.datepick2}
                        component={KeyboardDatePicker}
                        name="startDate"
                        label="Start Date"
                        format="dd/MM/yyyy"
                        clearable
                        autoOk
                        size="small"
                        inputVariant="outlined"
                        error={!!(errors.StartDate && touched.StartDate)}
                        helperText={errors.StartDate && touched.StartDate ? errors.StartDate : null}
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
        );
      }}
    </Formik>

  );
};

export default TaskAdd;
