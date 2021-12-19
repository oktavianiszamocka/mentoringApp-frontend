import React from 'react';
import styled from 'styled-components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

const StyledTitle = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: black;
`;
const StyledMessage = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    color: #4f5052;
    padding: 8px;
    border-radius: 6px;
    background-color: #e3e4e6;
    min-width: 50px;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '3rem',
    width: '100%',
  },
  iconcontainer: {
    padding: '10px',
  },
  message: {
    maxHeight: '25px',
    minWidth: '50px',
  },
  number: {
    maxHeight: '35px',
    maxWidth: '20px',

  },
}));

const MessageFull = ({
  message, senderUser, recieverUser,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item className={classes.iconcontainer}>
        {senderUser && senderUser.idUser === 9 ? <Avatar alt="person image" src={senderUser.imageUrl} /> : <Avatar alt="person image" src={recieverUser.imageUrl} />}
      </Grid>
      <Grid item xs={8}>
        <Grid container direction="column" spacing={0}>
          <Grid item className={classes.message}>
            <StyledMessage>
              {message}
            </StyledMessage>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageFull;
