import React, { useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import {
  Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Container, Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import logo from '../../assets/images/pja.png';
import Api from '../../api/index';

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
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login({ setToken, setRefreshToken }) {
  const classes = useStyles();
  const [ErrorLogin, setErrorLogin] = useState('');

  const submitLogin = async (values) => {
    setErrorLogin('');
    const responseToken = await Api.login(values)
      .then((response) => {
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        localStorage.setItem('idUser', response.data.idUser);
      })
      .catch((err) => {
        setErrorLogin(err.response.data);
      });

    /// setToken(responseToken.token);
    //  setRefreshToken(responseToken.refreshToken);
    //  console.log(responseToken.token);

    // console.log(responseToken.refreshToken);
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
};
