import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage, FieldArray,
} from 'formik';
import {
  Button, Chip, Grid, Snackbar,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import MaterialAvatar from '@material-ui/core/Avatar';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Select, KeyboardDatePicker } from 'material-ui-formik-components';
import * as Yup from 'yup';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { countries } from 'countries-list';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import Api from '../../api/index';

const StyledSection = styled.section`
  margin: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  width: '50rem';
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledInfoSection = styled.section`
  margin: 2rem;
  padding: 1rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;
const StyledUnderData = styled.p`
  font-family: 'Roboto', arial;
  font-size: 1rem;
  margin: 0px;
  padding: 1px;
  color: rgba(1,1,1,0.5);
`;

const StyledTitleName = styled.p`
  font-family: 'Roboto', arial;
  font-weight: 100;
  font-size: 25px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 10px;
  color: #4c4d4d;
  margin: 0;
`;
const StyledTitleEditProfile = styled.p`
  font-family: 'Roboto', arial;
  font-weight: 100;
  font-size: 25px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 10px;
  color: #4c4d4d;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const StyledLabel = styled.p`
font-family: 'Roboto', sans-serif;
color: rgba(0,0,0,0.5);
letter-spacing: 0.2rem;
font-size: 1em;
margin-top: 2px;
margin-left: 8px;
margin-bottom: 10px;
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  avatarGrid: {
    marginLeft: '2rem',
  },
  avatar: {
    width: '120px',
    height: '120px',
    boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)',
    borderRadius: '1.5rem',
  },
  inputStyle: {
    width: '30em',
  },
  error: {
    color: 'rgb(255,0,0,0.6)',
    marginTop: '5px',
    marginLeft: '12px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
  datePickerStyle: {
    marginLeft: '4px',
    width: '20em',
  },
  divFieldArrayStyle: {
    margin: '12px',
    marginLeft: '8px',
  },
  fieldChip: {
    marginRight: '4px',
    marginLeft: '15px',
    marginBottom: '1px',
  },
  skillFieldStyle: {
    width: '150px',
    verticalAlign: 'pointer',
    marginTop: '8px',
  },
  addIconStyle: {
    paddingTop: '15px',
    paddingLeft: '2px',
  },

});
const NewFormikEditForm = ({ profileInfo }) => {
  const classes = useStyles();
  const { isMentor } = profileInfo;

  const allCountries = [];
  for (const country in countries) {
    allCountries.push({ value: countries[country].name, label: countries[country].name });
  }
  const [successText, setSuccessText] = useState('Your profile has been changed successfully!');
  const [ErrorProfile, setErrorProfile] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [updateProfileInitialValue, setUpdateProfileInitialValue] = useState(profileInfo);
  const [successUpdate, setSuccessUpdate] = useState('false');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? 'simple-popover' : undefined;

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const onProfileUpdateHandler = async (profileData) => {
    setErrorProfile('');
    await Api.updateProfileData(profileData)
      .then((res) => {
        if (res.status === 200) {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setSuccessUpdate(true);
            window.location = `/profile/${profileInfo.user}`;
          }, 2000);

          //
        }
      })
      .catch((err) => {
        setErrorProfile(err.response.data);
      });
  };

  const initialValues = {
    lastName: profileInfo.lastName,
    firstName: profileInfo.firstName,
    email: profileInfo.email,
    phone: profileInfo.phone,
    dateOfBirth: profileInfo.dateOfBirth,
    country: profileInfo.country,
    major: profileInfo.major,
    semester: profileInfo.semester,
    skills: profileInfo.skills,
    experiences: profileInfo.experiences,
    title: profileInfo.title,
  };

  const onSubmit = (values) => {
    console.log(values);
    const profileData = {
      idUser: profileInfo.user,
      idProfile: profileInfo.idProfile,
      ...values,
    };
    console.log(`prfile data ${profileData}`);
    onProfileUpdateHandler(profileData);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Enter a valid email').required('Required'),
    phone: Yup.string().matches(phoneRegExp, 'Enter a valid phone number').required('Required'),
    country: Yup.string().required('Required'),
    major: Yup.string(),
    semester: Yup.string().matches(/^\d+$/, 'Digits only!').nullable(true),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty, isSubmitting, values, setFieldValue, handleReset,
        } = formik;
        return (
          <StyledSection>

            <Grid
              container
              spacing={3}
              alignItems="center"
            >
              <Grid item className={classes.avatarGrid}>
                <MaterialAvatar
                  src={profileInfo.avatar}
                  className={classes.avatar}
                />
              </Grid>
              <Snackbar
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
              >
                <Alert onClose={handleCloseSnackBar} severity="success">
                  {successText}
                </Alert>
              </Snackbar>
              {ErrorProfile && <Alert severity="error">{ErrorProfile}</Alert>}
              <Grid item xs={8}>
                <div>
                  <StyledTitleName>
                    {`${profileInfo.firstName} ${profileInfo.lastName}`}
                  </StyledTitleName>
                  {isMentor
                  && (
                  <div>
                    <StyledUnderData>{`${profileInfo.title}`}</StyledUnderData>
                  </div>
                  ) }
                  {!isMentor
                  && (
                  <div>
                    <StyledUnderData>{`${profileInfo.major}`}</StyledUnderData>
                    <StyledUnderData>{`Semester ${profileInfo.semester}`}</StyledUnderData>
                  </div>
                  ) }
                </div>
              </Grid>
            </Grid>
            <StyledInfoSection>
              <Grid container spacing={3} justify="center">
                <Grid item xs={12}>
                  <StyledTitleEditProfile>Edit Profile</StyledTitleEditProfile>
                </Grid>
              </Grid>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      type="search"
                      variant="outlined"
                      className={classes.inputStyle}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      type="search"
                      variant="outlined"
                      className={classes.inputStyle}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      id="email"
                      name="email"
                      label="E-mail"
                      type="search"
                      variant="outlined"
                      className={classes.inputStyle}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      type="search"
                      variant="outlined"
                      className={classes.inputStyle}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                      <Field
                        className={classes.datePickerStyle}
                        component={KeyboardDatePicker}
                        name="dateOfBirth"
                        label="Date of birth"
                        format="dd/MM/yyyy"
                        clearable
                        autoOk
                        fullWidth
                        inputVariant="outlined"
                        error={!!(errors.startDate && touched.startDate)}
                        helperText={errors.startDate && touched.startDate ? errors.startDate : null}
                      />

                    </MuiPickersUtilsProvider>

                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      id="country"
                      required
                      label="Country"
                      size="medium"
                      name="country"
                      variant="outlined"
                      options={allCountries}
                      component={Select}
                      className={classes.inputStyle}

                    />

                    <ErrorMessage
                      name="country"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>

                  { isMentor
                  && (
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      id="title"
                      defaultValue=""
                      name="title"
                      label="Title"
                      variant="outlined"
                      className={classes.inputStyle}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  )}

                  { !isMentor
                  && (
                  <Grid item container spacing={3} alignItems="center">
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        def
                        id="major"
                        name="major"
                        label="Major"
                        type="search"
                        variant="outlined"
                        className={classes.inputStyle}
                      />
                      <ErrorMessage
                        name="major"
                        component="div"
                        className={classes.error}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        id="semester"
                        name="semester"
                        label="Semester"
                        type="search"
                        variant="outlined"
                        className={classes.inputStyle}
                      />
                      <ErrorMessage
                        name="semester"
                        component="div"
                        className={classes.error}
                      />
                    </Grid>
                  </Grid>
                  )}
                  <Grid item xs={12}>
                    <StyledLabel>Skills:</StyledLabel>
                    <FieldArray name="skills">
                      {
                        (fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values } = form;
                          const { skills } = values;
                          return (
                            <div className={classes.divFieldArrayStyle}>
                              {
                                  skills && skills.map((skill, index) => (
                                    <Field
                                      as={Chip}
                                      name={`skills[${index}]`}
                                      color="primary"
                                      onDelete={() => {
                                        console.log(values);
                                        remove(index);
                                      }}
                                      label={skill}
                                      className={classes.fieldChip}
                                    />
                                  ))
                              }
                              <div>
                                <TextField
                                  id="skillTextField"
                                  size="small"
                                  className={classes.skillFieldStyle}
                                  label="Add skill"
                                  onChange={(e) => setNewSkill(e.target.value)}
                                  variant="outlined"
                                />
                                <AddIcon
                                  className={classes.addIconStyle}
                                  onClick={() => {
                                    push(newSkill);
                                    document.getElementById('skillTextField').value = '';
                                  }}
                                />
                              </div>

                            </div>
                          );
                        }
                    }
                    </FieldArray>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      id="experiences"
                      name="experiences"
                      label="Experiences"
                      type="search"
                      variant="outlined"
                      className={classes.inputStyle}
                    />
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                  >
                    <Button
                      variant="contained"
                      justify="center"
                      color="secondary"
                      type="submit"
                    >
                      Save changes
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </StyledInfoSection>
          </StyledSection>
        );
      }}

    </Formik>
  );
};

NewFormikEditForm.defaultProps = {
  initialValues: {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
    major: '',
    semester: '',
    skills: [],
    experiences: '',
    title: '',
  },

};
export default NewFormikEditForm;
