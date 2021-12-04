import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import {
  Button, CssBaseline, TextField, Grid, Container,
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
  errorAlert: {
    margin: '5px',
    color: 'green',
  },
}));

function Alert(props) {
  return <MuiAlert style={{ marginTop: '5px' }} elevation={6} variant="filled" {...props} />;
}

export default function ResetPassword() {
  const classes = useStyles();
  const [ErrorLogin, setErrorLogin] = useState('');
  const [projectSuccess, setProjectSuccess] = useState(false);

  const submitChangePassword = async (values) => {
    /*
    const passwordData = {
      idUser: Api.getUserId(),
      oldPassword: values.oldPassword, // test123
      newPassword: values.newPassword,
    };

    await Api.changePassword(passwordData)
      .then(async (response) => {
        setProjectSuccess(true);
      }).catch((err) => {
        setProjectError(err.response.data);
      });
      */

  };

  const validationSchema = Yup.object({
    newPassword: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Required'),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="Logo" />
        {ErrorLogin && (
          <Alert severity="error">{ErrorLogin}</Alert>
        )}
        <Formik
          onSubmit={submitChangePassword}
          validationSchema={validationSchema}
          initialValues={{ oldPassword: '', newPassword: '' }}
        >
          <Form className={classes.form}>
            <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
              <StyledTitle>Reset password</StyledTitle>
              <StyledUnderTitle>Enter the new password</StyledUnderTitle>
              <Grid item>
                <Field
                  style={{ width: '350px' }}
                  as={TextField}
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type="password"
                  variant="outlined"
                />
                <ErrorMessage
                  name="newPassword"
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
                  Submit
                </Button>
                {projectSuccess && <MuiAlert style={{ marginTop: '5px' }}>Password successfuly changed</MuiAlert>}

              </Grid>

            </Grid>
          </Form>

        </Formik>

      </div>
    </Container>
  );
}
