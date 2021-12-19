import React, { useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
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
  forgotPass: {
    marginLeft: '4rem',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login({
  setToken, setRefreshToken, setIdUser, setUserRole,
}) {
  const classes = useStyles();
  const [ErrorLogin, setErrorLogin] = useState('');

  const submitLogin = async (values) => {
    setErrorLogin('');
    const responseToken = await Api.login(values)
      .then((response) => {
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        setIdUser(response.data.idUser);
        setUserRole(response.data.role);
        // localStorage.setItem('idUser', response.data.idUser);
        window.location.href = '/';
      })
      .catch((err) => {
        setErrorLogin(err.response.data);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="Logo" />
        {ErrorLogin && <Alert severity="error">{ErrorLogin}</Alert>}
        <Formik
          onSubmit={submitLogin}
          initialValues={{ username: '', password: '' }}
        >
          <Form className={classes.form}>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <StyledLabel>
              Dont have an account yet? Register
              {' '}
              <u><a href="/signup">here</a></u>
            </StyledLabel>
            <StyledLabel>

              <a className={classes.forgotPass} href="/forgot-password">Forgot your password?</a>

            </StyledLabel>
            <Grid container />
          </Form>

        </Formik>

      </div>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setRefreshToken: PropTypes.func.isRequired,
  setIdUser: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
};
