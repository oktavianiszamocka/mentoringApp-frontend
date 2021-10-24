import React from 'react';
import {
  Button, Paper, TextField, Grid,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { blue50 } from 'material-ui/styles/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    textAlign: 'center',
    background: blue50,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitButton: {
    marginTop: '10px',

  },
}));

const MilestoneSchema = Yup.object().shape({
  description: Yup.string().min(1).max(300).required('Please enter the milestone description'),
});

const MilestoneForm = (props) => {
  const handleSubmit = async (values, { resetForm }) => {
    const successCallout = false;

    await props.onSubmitHandler(values)
      .then((res) => {
        resetForm({
          values: {
            description: '',
          },
        });
      });
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <h1>
          {' '}
          {props.formState}
          {' '}
          Milestone Step
          {' '}
        </h1>

        <Formik
          onSubmit={handleSubmit}
          initialValues={props.initialValues}
          validationSchema={MilestoneSchema}
        >
          <Form>
            <Paper elevation={1} className={classes.paper}>
              <Field
                as={TextField}
                name="description"
                placeholder="Please write your milestone description here"
                maxLength={300}
                multiline
              />
              <Button
                className={classes.submitButton}
                type="submit"
                color="primary"
                variant="contained"
                autoFocus
              >
                Submit
              </Button>
            </Paper>
          </Form>
        </Formik>

      </div>
    </Container>
  );
};

MilestoneForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  formState: PropTypes.string,
};
MilestoneForm.defaultProps = {
  initialValues: {
    description: '',
  },
  formState: 'New',
};

export default MilestoneForm;
