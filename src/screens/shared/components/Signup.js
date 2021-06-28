import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Grid, TextField, Divider, Button, Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,

} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select, KeyboardDatePicker } from 'material-ui-formik-components';
import { countries } from 'countries-list';
import logo from '../../../assets/images/pja.png';
import Api from '../../../api/index';

const StyledOuterDiv = styled.div`
  display: flex;
  margin: 5px auto;
  width: 731px;
  min-height: 860px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px;
`;

const StyledDivTerms = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin: 60px auto;
  box-shadow: 1px 1px 2px 1px rgba(135, 135, 135, 1);
`;

const StyledTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-top: -60px;
  margin-bottom: 0px;
  margin-left: 15px;
`;

const StyledLabel = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;  
  color: rgba(0,0,0,0.5);
  margin-top: 8px;
  margin-left: 15px;
`;

const StyledTermsLabel = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;  
  color: rgba(0,0,0,0.5);
  margin-top: 0px;
  margin-bottom: 0px;

`;

const StyledImg = styled.img`
  width: 210px;
  height: 120px;
  margin-left: 260px;
  margin-top: -10px;
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 185,
  },
  formControl2: {
    margin: theme.spacing(0),

    minWidth: 193,
  },
  email: {
    margin: theme.spacing(0),
    minWidth: 400,
  },
  divider: {
    marginTop: '10px',
  },
  check: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    color: 'rgba(0,0,0,0.5)',
  },
  signupbot: {
    marginLeft: '160px',
  },
  error: {
    color: 'rgb(255,0,0,0.6)',
    marginTop: '5px',
    marginLeft: '12px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
  checkbox: {
    marginRight: '4px',
    marginTop: '2px',
  },
}));

const Signup = (props) => {
  const classes = useStyles();

  const allCountries = [];
  for (const country in countries) {
    allCountries.push({ value: countries[country].name, label: countries[country].name });
  }
  const roleOptions = [
    { value: 2, label: 'Student' },
    { value: 3, label: 'Mentor' },
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [role, setRole] = React.useState('');
  const [confirmPass, setconfirmPass] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [successText, setSuccessText] = useState('Congratulations! Your account is successfully created. Please log in with the email and password!');
  const [ErrorAccount, setErrorAccount] = useState('');
  const [redirect, setRedirect] = useState(false);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

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

  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    role: '',
    phoneNumber: '',
    country: '',
    major: '',
    semester: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const onSubmit = async (values) => {
    const loginData = {
      ...values,
    };
    console.log(loginData);
    const response = await Api.register(loginData)
      .then((data) => {
        console.log('success');
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setRedirect(true);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setErrorAccount(err);
      });
  };

  if (redirect) {
    console.log('rediretc');
    return <Redirect to="/login" />;
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    phone: Yup.string().matches(phoneRegExp, 'Enter a valid phone number').required('Required'),
    country: Yup.string().required('Required'),
    major: Yup.string().required('Required'),
    semester: Yup.string().matches(/^(?:[1-6])$/, 'Semester 1-6!').required('Required'),
    email: Yup.string().matches(emailRegExp, 'Enter a valid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  return (
    <StyledOuterDiv>
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
              <Snackbar
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                open={open}
                autoHideDuration={1000}
                onClose={handleCloseSnackBar}
              >
                <Alert onClose={handleCloseSnackBar} severity="success">
                  {successText}
                </Alert>
              </Snackbar>
              <StyledDiv>
                {' '}
                <StyledImg src={logo} alt="Logo" />
                <StyledTitle>Sign up</StyledTitle>
                <StyledLabel>Please fill this form to create account</StyledLabel>
                <Divider />
                {ErrorAccount && <Alert severity="error">{ErrorAccount}</Alert>}
              </StyledDiv>
              <Form>
                <Grid container justify="center" spacing={2} style={{ maxWidth: '500px' }}>
                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      id="firstName"
                      name="firstName"
                      label="First name"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                      <Field
                        component={KeyboardDatePicker}
                        name="dateOfBirth"
                        label="Date of birth"
                        format="dd/MM/yyyy"
                        clearable
                        autoOk
                        fullWidth
                        inputVariant="outlined"
                        error={!!(errors.dateOfBirth && touched.dateOfBirth)}
                        helperText={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : null}
                      />
                    </MuiPickersUtilsProvider>

                  </Grid>

                  <Grid item xs={5}>
                    <FormControl variant="outlined" className={classes.formControl2}>
                      <Field
                        required
                        label="Role"
                        size="medium"
                        name="role"
                        variant="outlined"
                        options={roleOptions}
                        component={Select}
                        error={!!(errors.role && touched.role)}
                        helperText={errors.role && touched.role ? errors.role : null}
                      />

                    </FormControl>
                  </Grid>

                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      id="phone"
                      name="phone"
                      label="Phone number"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <FormControl variant="outlined" className={classes.formControl2}>
                      <Field
                        required
                        label="Country"
                        size="medium"
                        name="country"
                        variant="outlined"
                        options={allCountries}
                        component={Select}
                        error={!!(errors.country && touched.country)}
                        helperText={errors.country && touched.country ? errors.country : null}
                      />

                    </FormControl>
                  </Grid>

                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      id="major"
                      name="major"
                      label="Major"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="major"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      id="semester"
                      name="semester"
                      label="Semester"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="semester"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Field
                      as={TextField}
                      className={classes.email}
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      id="confirmPassword"
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item xs={11}>
                    <StyledDivTerms>
                      <Field type="checkbox" name="acceptTerms" className={classes.checkbox} />
                      <StyledTermsLabel>Accept Terms & Conditions</StyledTermsLabel>

                    </StyledDivTerms>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className={classes.error}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Button
                      className={classes.signupbot}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </Grid>
                  <Grid item>
                    <StyledLabel style={{ marginRight: '30px' }}>
                      Already have account? Log in
                      {' '}
                      <u><a href="/login">here</a></u>
                    </StyledLabel>
                  </Grid>
                </Grid>

              </Form>
            </StyledSection>
          );
        }}

      </Formik>

    </StyledOuterDiv>
  );
};

export default Signup;
