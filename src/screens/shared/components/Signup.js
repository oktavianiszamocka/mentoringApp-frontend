import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import styled from 'styled-components';
import {
  Grid,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { countries } from 'countries-list';
import logo from '../../../assets/images/pja.png';

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

const Signup = () => {
  const classes = useStyles();

  const allCountries = [];
  for (const country in countries) {
    allCountries.push(countries[country].name);
  }

  const [selectedDate, setSelectedDate] = useState(null);
  const [role, setRole] = React.useState('');
  const [confirmPass, setconfirmPass] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [checked, setChecked] = React.useState(false);
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

  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(selectedDate),
    role: 'Student',
    phoneNumber: '',
    country: 'Poland',
    major: '',
    semester: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const onSubmit = (values) => {
    console.log(allCountries);
    const loginData = {
      ...values,
    };
    console.log(loginData);
  };

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
        <StyledSection>
          <StyledDiv>
            {' '}
            <StyledImg src={logo} alt="Logo" />
            <StyledTitle>Sign up</StyledTitle>
            <StyledLabel>Please fill this form to create account</StyledLabel>
            <Divider />
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
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date of birth"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={5}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={role}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                  </Select>
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
                  <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={country}
                    onChange={handleCountryChange}
                    label="Country"
                  >
                    {' '}

                    {
                      allCountries.map((countryy, index) => (
                        <MenuItem value={countryy}>{countryy}</MenuItem>
                      ))
                    }
                  </Select>
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
                  <u><a href="http://localhost:3000/signup">here</a></u>
                </StyledLabel>
              </Grid>
            </Grid>
          </Form>
        </StyledSection>
      </Formik>
    </StyledOuterDiv>
  );
};

export default Signup;
