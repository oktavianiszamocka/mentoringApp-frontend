import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const StyledTitle = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: black;
`;
const StyledMessage = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    color: #4f5052;
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
    '@media (max-width: 900px)': {
      maxHeight: '45px',

    },
  },
  messageTime: {
    maxHeight: '25px',
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  number: {
    maxHeight: '35px',
    maxWidth: '20px',
  },
  messageContainer: {
    '@media (min-width: 1536px)': {
      minWidth: '230px',
    },
    '@media (min-width: 1750px)': {
      minWidth: '260px',
    },
  },

}));

const MessageItem = ({
  message, user, lastmessage,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Grid container direction="row">
        <Grid item className={classes.iconcontainer}>
          <Avatar alt="person image" src={user.imageUrl} />
        </Grid>
        <Grid item sm={4} md={5} lg={6} xl={9} className={classes.messageContainer}>
          <Grid
            container
            direction="column"
            spacing={0}
          >
            <Grid item className={classes.message}>
              <StyledTitle>
                {user.firstName}
                {' '}
                {user.lastName}
              </StyledTitle>
            </Grid>
            <Grid item className={classes.message}>
              <StyledMessage>{message}</StyledMessage>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.messageTime}>
          {lastmessage ? <StyledMessage>{lastmessage.split('T').pop().substr(0, 5)}</StyledMessage> : <div />}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MessageItem;
