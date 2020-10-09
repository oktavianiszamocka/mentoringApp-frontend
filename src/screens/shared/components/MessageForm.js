import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const StyledNewMessageContainer = styled.div`
  height: 4.5rem;
  width: 45rem;
  margin: 7px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(-1),
    },
  },
  input: {
    display: 'none',
  },
  inField: {
    width: '30rem',
    marginLeft: '10px',
    marginTop: '8px',
    marginRight: '0.4rem',
  },
  inPhoto: {
    marginTop: '10px',
    marginRight: '4rem',
  },
  button: { marginTop: '1rem' },
}));

export default function MessageForm() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      console.log('Message:', values);
    },
  });

  return (
    <StyledNewMessageContainer>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.inField}
          label="Message"
          variant="outlined"
          type="text"
          id="message"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton
            className={classes.inPhoto}
            color="black"
            aria-label="upload picture"
            component="span"
          >
            <AddAPhotoIcon fontSize="medium" />
          </IconButton>
        </label>
        <Button className={classes.button} type="submit" variant="outlined">
          Send
        </Button>
      </form>
    </StyledNewMessageContainer>
  );
}
