import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Chip from '@material-ui/core/Chip';
import { useParams } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardTimePicker, KeyboardDatePicker } from 'material-ui-formik-components';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import Api from '../../../../api/index';

const StyledDiv = styled.div`
  background-color: white;
  position: absolute;
  max-width: 250px;
  min-height: 250px;
  max-height: 750px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #9e9e99;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 16px;
   font-weight: bold;
   color: #616366;
`;

const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #4f5052;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;
  margin: 0px;
`;
function Alert(props) {
  return <MuiAlert style={{ marginTop: '5px' }} elevation={6} variant="filled" {...props} />;
}

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
    marginLeft: '135px',

  },
  grid: {
    marginBottom: '-15px',
  },
  title: {
    marginLeft: '2px',
    marginBottom: '25px',
    marginTop: '-10px',
    width: '225px',
  },
  resize: {
    fontSize: '13px',
  },
  resize_time: {
    fontSize: '13px',
    padding: '8px',
  },
  description: {
    marginBottom: '10px',
    width: '230px',
  },
  location: {
    marginBottom: '5px',
    marginTop: '-2px',
    width: '230px',
  },
  times: {
    marginBottom: '5px',
    marginTop: '-2px',
    width: '110px',
  },
  times_grid: {
    marginRight: '25px',
  },
  times_grid2: {
    marginLeft: '15px',
    marginRight: '25px',
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
  button: {
    marginLeft: '85px',
    marginTop: '8px',
  },
  formControl: {
    marginTop: '10px',
    marginLeft: '5px',
    marginBottom: '15px',
    minWidth: 230,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  attendees: {
    fontSize: '15px',
  },
  error: {
    color: 'rgb(255,0,0,0.6)',
    marginTop: '-20px',
    marginLeft: '5px',
    marginBottom: '10px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
  error2: {
    color: 'rgb(255,0,0,0.6)',
    marginLeft: '5px',
    fontFamily: 'Roboto',
    fontSize: '13px',
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

const MeetingsAddProject = (props) => {
  const { IdProject } = useParams();
  const classes = useStyles();
  const [asignees, setAsignees] = useState([]);
  const [asigneeIds, setAsigneeIds] = React.useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const compare = (a, b) => {
    const time1 = parseFloat(a.startTime.slice(0, -3).replace(':', '.'));
    const time2 = parseFloat(b.startTime.slice(0, -3).replace(':', '.'));
    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
  };

  const getTaskAsignees = async () => {
    const res = await Promise.all([Api.getTasksAsignees(IdProject)]);
    const res2 = await Promise.all([Api.getProjectPromoters(IdProject)]);
    const { mainMentor } = res2[0].data.data;
    const { additionalMentors } = res2[0].data.data;
    const students = res[0].data.data;
    students.push(mainMentor);
    const allMembers = students.concat(additionalMentors);

    setAsignees(allMembers);
  };

  const handleChange = (event) => {
    setAsigneeIds(event.target.value);
  };

  useEffect(() => {
    const loadData = async () => {
      getTaskAsignees();
    };

    loadData();
  }, [props.close]);

  const loadSubmittedMeeting = async (meetingDateSubmitDate) => {
    const res = await Api.getProjectMeetings(IdProject, meetingDateSubmitDate);
    res.data.data.sort(compare);
    props.setMeetings(res.data.data);
  };

  const onMeetingAddHandler = async (meetingData) => {
    setError(false);
    await Api.addMeeting(meetingData)
      .then(async () => {
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
          props.close(false);
          const meetingDateToCheck = moment(meetingData.meetingDate).format('YYYY-MM-DD');
          loadSubmittedMeeting(meetingDateToCheck);
        }, 2000);
      }).catch((err) => {
        setError(true);
      });
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
    top: '150px',
    left: '450px',
  };

  const closeAdd = () => {
    props.close(false);
  };

  const initialValues = {
    title: '',
    date: props.date,
    location: '',
    description: '',
    project: IdProject,
    start: '',
    end: '',
    attendeeUsers: [],
  };

  const onSubmit = (values) => {
    const attendees = [];
    attendees.push(values.attendees);
    const startTimeParse = moment(values.start).format('HH:mm');
    const endTimeParse = moment(values.end).format('HH:mm');
    const meetingData = {
      title: values.title,
      meetingDate: values.date,
      location: values.location,
      description: values.description,
      project: parseInt(IdProject),
      startTime: startTimeParse,
      endTime: endTimeParse,
      AttendeeUsers: asigneeIds,
    };
    onMeetingAddHandler(meetingData);
  };

  const validate = Yup.object({
    title: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    description: Yup.string().min(10, 'Must be at least 10 characters'),
    date: Yup.date(),

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
            {error && <Alert severity="error">Error in server</Alert>}
            {success && <Alert severity="success">Your meeting has been submittted!</Alert>}

            <Form>
              <Grid container direction="row" className={classes.grid}>
                <Grid item>

                  <StyledTitle>Add Meeting</StyledTitle>
                </Grid>
                <CloseIcon className={classes.close} onClick={closeAdd} />
                <Grid item>
                  <div>
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
                  </div>
                </Grid>
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      className={classes.fieldStyle}
                      component={KeyboardDatePicker}
                      name="date"
                      label="Meeting Date"
                      format="dd/MM/yyyy"
                      clearable
                      autoOk
                      fullWidth
                      inputVariant="outlined"
                      error={!!(errors.date && touched.date)}
                      helperText={errors.date && touched.date ? errors.date : null}
                    />

                  </MuiPickersUtilsProvider>

                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                className={classes.times_grid2}
              >
                <Grid
                  item
                  className={classes.times_grid}
                >
                  <Grid container direction="column">
                    <Grid item>
                      <StyledUnderTitle>START TIME</StyledUnderTitle>
                    </Grid>
                    <Grid item>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field
                          component={KeyboardTimePicker}
                          id="start"
                          name="start"
                          ampm={false}
                          className={classes.times}
                          InputProps={{
                            classes: {
                              input: classes.resize_time,
                            },
                          }}
                          variant="outlined"
                        />
                      </MuiPickersUtilsProvider>
                      <ErrorMessage
                        name="start"
                        component="div"
                        className={classes.error2}
                      />

                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <StyledUnderTitle>END TIME</StyledUnderTitle>
                    </Grid>
                    <Grid item>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field
                          component={KeyboardTimePicker}
                          ampm={false}
                          id="end"
                          name="end"
                          className={classes.times}
                          InputProps={{
                            classes: {
                              input: classes.resize_time,
                            },
                          }}
                          variant="outlined"
                        />
                      </MuiPickersUtilsProvider>
                      <ErrorMessage
                        name="end"
                        component="div"
                        className={classes.error2}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <StyledUnderTitle>DESCRIPTION</StyledUnderTitle>
              </Grid>
              <div>
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
                  className={classes.error2}
                />
              </div>

              <Grid container direction="column">
                <Grid item>
                  <StyledUnderTitle>LOCATION</StyledUnderTitle>
                </Grid>
                <Grid item>
                  <div>
                    <Field
                      as={TextField}
                      id="location"
                      name="location"
                      label="Enter location"
                      className={classes.location}
                      InputProps={{
                        classes: {
                          input: classes.resize,
                        },
                      }}
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className={classes.error2}
                    />
                  </div>

                </Grid>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.attendees} id="demo-mutiple-chip-label">Attendees</InputLabel>
                  <Field
                    as={Select}
                    type="text"
                    name="attendeeUsers"
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

              <Divider />

              <Grid container direction="row">

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

export default MeetingsAddProject;
