import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const StyledNewMessageContainer = styled.div`
  height: 4rem;
  width: 45rem;
  margin: 7px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
`;

const StyledInput = styled.input`
  margin: 15px;
  width: 30rem;
  border-radius: 0.5rem;
  border: 1px solid #dcdcdc;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function MessageForm() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      message: 'Type your message',
    },
    onSubmit: (values) => {
      console.log('Message:', values);
    },
  });

  return (
    <StyledNewMessageContainer>
      <form onSubmit={formik.handleSubmit}>
        <StyledInput
          type="text"
          id="message"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="black" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <Button type="submit" variant="outlined" margin="4px">
          Send
        </Button>
      </form>
    </StyledNewMessageContainer>
  );
}
