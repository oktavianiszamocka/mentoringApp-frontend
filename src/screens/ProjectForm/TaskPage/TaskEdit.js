import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Typography,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from 'material-ui-formik-components';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: #F5F5F5;                                                                                                                                                                           
  position: absolute;
  min-height: 30rem;
  max-width: 24rem;
  width: 22rem;
  max-height: 34rem;
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
    marginRight: '1rem',
  },
  grid: {
    marginBottom: '-15px',
  },
  title: {
    marginBottom: '15px',
    width: '21rem',
  },
  resize: {
    fontSize: '13px',
  },
  description: {
    marginBottom: '10px',
    marginTop: '20px',
    width: '21rem',
  },
  prioritySelect: {
    width: '13rem',
    alignContent: 'right',
    marginLeft: '4rem',
    fontSize: '13px',
    marginTop: '5px',

  },
  resize2: {
    fontSize: '13px',
    marginLeft: '7px',
  },
  datepick: {
    marginLeft: '1.5rem',
    fontSize: '10px',
    marginTop: '1rem',

  },
  datepick2: {
    marginLeft: '1rem',
    fontSize: '10px',
    marginTop: '0.5rem',

  },
  button: {
    width: '50%',
    marginLeft: '5rem',
    marginTop: '8px',
  },
  formControl: {
    marginTop: '5px',
    marginLeft: '4rem',
    marginBottom: '5px',
    maxHeight: '5rem',
    minWidth: '10rem',
    maxWidth: '13rem',
  },
  asigneeSelect: {
    maxHeight: '10rem',

  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  error: {
    color: 'rgb(255,0,0,0.6)',
    marginTop: '-9px',
    marginLeft: '5px',
    marginBottom: '5px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
  header: {
    margin: 'auto',
    width: '40%',
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

const TaskEdit = (props) => {
  const classes = useStyles();
  const { taskInfo } = props;
  const [IdProject, setIdProject] = useState(taskInfo.project);

  const [statuses, setStatuses] = useState([]);
  const [asignees, setAsignees] = useState([]);
  const [assignedIds, setAsignedIds] = React.useState(taskInfo.assignedUsers);

  const [peopleToAdd, setPeopleToAdd] = useState([]);
  const [peopleAdd, setPeopleAdd] = useState(false);

  const [peopleToRemove, setPeopleToRemove] = useState([]);
  const [peopleRemove, setPeopleRemove] = useState(false);

  const initialIds = taskInfo.assignedUsers;

  const handleChange = (event) => {
    const newIds = event.target.value;
    let addAssignee = false;
    let removeAssignee = false;

    const idsToRemove = [];
    const checker = (arr, target) => target.every((v) => arr.includes(v));

    if (checker(newIds, initialIds) === false) {
      removeAssignee = true;
    } else if (checker(newIds, initialIds) === true) {
      removeAssignee = false;
    }

    const union = [];
    newIds.map((id) => {
      if (initialIds.includes(id)) {
        union.push(id);
      }
    });

    initialIds.map((id) => {
      if (!union.includes(id)) {
        idsToRemove.push(id);
      }
    });

    const idsToAdd = [];
    newIds.map((id) => {
      if (!initialIds.includes(id)) {
        addAssignee = true;
        idsToAdd.push(id);
      }
    });

    setPeopleToAdd(idsToAdd);
    setPeopleAdd(addAssignee);

    setPeopleRemove(removeAssignee);
    setPeopleToRemove(idsToRemove);

    setAsignedIds(event.target.value);
  };

  const getTaskStatuses = async () => {
    const res = await Promise.all([Api.getTasksStatuses()]);
    setStatuses(res[0].data.data);
  };

  const getTaskAsignees = async () => {
    const res = await Promise.all([Api.getTasksAsignees(IdProject)]);
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

  const styles = {
    position: 'absolute',
    zIndex: 5,
  };

  useEffect(() => {
    const loadData = async () => {
      getTaskStatuses();
      getTaskAsignees();
    };

    loadData();
  }, []);

  const initialValues = {
    title: taskInfo.title,
    status: taskInfo.status,
    description: taskInfo.description,
    startDate: taskInfo.startDate,
    expectedEndDate: taskInfo.expectedEndDate,
    project: taskInfo.project,
    creator: taskInfo.creator,
    createdOn: taskInfo.createdOn,
    priority: taskInfo.priority,
    assignedUsers: taskInfo.assignedUsers,
  };

  const onSubmit = async (values) => {
    const taskData = {
      idTask: taskInfo.idTask,
      title: values.title,
      status: values.status,
      description: values.description,
      startDate: values.startDate,
      expectedEndDate: values.expectedEndDate,
      project: IdProject,
      priority: values.priority,
      assignedUsers: values.assignedUsers,
      IsAddNewAssignee: peopleAdd,
      AssignedUsersToAdd: peopleToAdd,
      IsRemoveAssignee: peopleRemove,
      AssignedUsersToRemove: peopleToRemove,
    };

    await Api.updateTask(taskData)
      .then(async () => {
        props.showEdit(false);
        props.reRender();
      });
  };

  const validate = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().min(10, 'Must have at least 10 characters'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validate}
    >
      {(formik) => {
        const {
          errors, touched,
        } = formik;
        return (
          <StyledDiv style={styles}>
            <Form>
              <Grid container direction="row" className={classes.grid}>
                <Typography variant="h5" className={classes.header}>Edit Task</Typography>
                <CloseIcon className={classes.close} onClick={() => props.showEdit()} />
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
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={classes.error}
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
              <ErrorMessage
                name="description"
                component="div"
                className={classes.error}
              />
              <Divider />
              <Grid container direction="row">
                <Grid item>
                  <StyledUnderTitle>PRIORITY</StyledUnderTitle>
                </Grid>
                <Grid item>

                  <div>
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

                    <Field
                      className={classes.asigneeSelect}
                      as={Select}
                      type="text"
                      name="assignedUsers"
                      multiple
                      value={assignedIds}
                      onChange={handleChange}
                      renderValue={(selected) => (

                        <div className={classes.chips}>

                          {selected.map((value) => (
                            <Grid item>
                              <Chip key={value} label={getNameIdPair()[value]} className={classes.chip} />
                            </Grid>
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
                      />
                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className={classes.error}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid container direction="row">
                  <Grid item>
                    <StyledUnderTitle>DEADLINE</StyledUnderTitle>
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
                        />
                        <ErrorMessage
                          name="expectedEndDate"
                          component="div"
                          className={classes.error}
                        />

                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Divider />

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

TaskEdit.prototype = {
  taskInfo: PropTypes.object,
  showEdit: PropTypes.func,
  reRender: PropTypes.func,

};

export default TaskEdit;
