import React from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    marginBottom: '15px',
    marginLeft: '5px',
    background: 'white',
    minWidth: '300px',
    minHeight: '80px',
  },
  submitButton: {
    marginTop: '10px',
    width: '100px',
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
}));

const NoteSchema = Yup.object().shape({
  note: Yup.string().min(1).max(300).required('Please enter the note text'),
});

const NewTaskForm = (setVisible) => {
  const classes = useStyles();

  return (
    <Paper elevation={1} className={classes.paper}>
      <TextField
        InputProps={{ classes }}
        name="task"
        placeholder="Enter a note"
        multiline
      />
      <StyledDiv>
        <Button
          className={classes.submitButton}
          size="small"
          type="submit"
          color="primary"
          variant="contained"
          autoFocus
        >
          Add
        </Button>
        <Button
          className={classes.submitButton}
          size="small"
          type="submit"
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>

      </StyledDiv>
    </Paper>
  );
};

export default NewTaskForm;
