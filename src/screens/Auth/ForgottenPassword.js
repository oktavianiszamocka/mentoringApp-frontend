import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import {
  Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Container, Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logo from '../../assets/images/pja.png';
import Api from '../../api/index';

const StyledLabel = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;  
  color: rgba(0,0,0,0.5);
  margin-top: 8px;
  margin-left: 4rem;
`;

const StyledTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;  
  color: rgba(0,0,0);
  margin-bottom: -3px;

`;

const StyledUnderTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;  
  color: rgba(0,0,0,0.5);
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'rgb(255,0,0,0.6)',
    marginTop: '5px',
    marginLeft: '12px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ForgottenPassword({ setToken, setRefreshToken }) {
  const classes = useStyles();
  const [ErrorLogin, setErrorLogin] = useState('');
  const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submitLogin = async (values) => {
    // setErrorLogin('');
    // const responseToken = await Api.login(values)
    //   .then((response) => {
    //     setToken(response.data.token);
    //     setRefreshToken(response.data.refreshToken);
    //     localStorage.setItem('idUser', response.data.idUser);
    //   })
    //   .catch((err) => {
    //     setErrorLogin(err.response.data);
    //   });

    /// setToken(responseToken.token);
    //  setRefreshToken(responseToken.refreshToken);
    //  console.log(responseToken.token);

    // console.log(responseToken.refreshToken);
  };

  const validationSchema = Yup.object({
    email: Yup.string().matches(emailRegExp, 'Enter a valid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="Logo" />
        {ErrorLogin && <Alert severity="error">{ErrorLogin}</Alert>}
        <Formik
          onSubmit={submitLogin}
          validationSchema={validationSchema}
          initialValues={{ username: '', password: '' }}
        >
          <Form className={classes.form}>
            <StyledTitle>Forgot your password?</StyledTitle>
            <StyledUnderTitle>Enter your email and enter new password below</StyledUnderTitle>
            <Grid container direction="column" justify="center" spacing={2}>
              <Grid item>
                <Field
                  style={{ width: '350px' }}
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
              <Grid item>
                <Field
                  style={{ width: '350px' }}

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
              <Grid item>
                <Field
                  style={{ width: '350px' }}
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

              <Grid item>
                <Button
                  className={classes.signupbot}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign up
                </Button>
              </Grid>

            </Grid>
          </Form>

        </Formik>

      </div>
    </Container>
  );
}

ForgottenPassword.propTypes = {
  setToken: PropTypes.func.isRequired,
  setRefreshToken: PropTypes.func.isRequired,
};
