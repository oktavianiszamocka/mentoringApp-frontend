import React from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#ffff80',
  },
  submitButton: {
    marginTop: '10px',
  },
}));

const NoteSchema = Yup.object().shape({
  note: Yup.string().min(1).max(300).required('Please enter the note text'),
});

const NoteForm = ({ onSubmit, initialValue }) => {
  const classes = useStyles();

  return (
    <Formik onSubmit={onSubmit} initialValues={{ note: initialValue }} validationSchema={NoteSchema}>
      <Form>
        <Paper elevation={1} className={classes.paper}>
          <Field
            as={TextField}
            name="note"
            placeholder="Please write your note here"
            maxLength={300}
            multiline
          />
          <Button
            className={classes.submitButton}
            size="small"
            type="submit"
            color="secondary"
            variant="contained"
            autoFocus
          >
            Submit
          </Button>
        </Paper>
      </Form>
    </Formik>
  );
};

NoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NoteForm;
