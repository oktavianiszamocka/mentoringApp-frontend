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
    font-size: 11px;
    color: #4f5052;
`;

const StyledNumber = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    background-color: #01a389;
    color: white;
    text-align: center;
    border-radius: 4px;
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
  },
  number: {
    maxHeight: '35px',
    maxWidth: '20px',

  },
}));

const MessageItem = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Grid container direction="row">
        <Grid item className={classes.iconcontainer}>
          <Avatar alt="person image" />
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="column" spacing={0}>
            <Grid item className={classes.message}>
              <StyledTitle>Joanna Bienkowska</StyledTitle>
            </Grid>
            <Grid item className={classes.message}>
              <StyledMessage>Hey please contact me about the frontend :)</StyledMessage>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={0} style={{ marginLeft: '10px' }}>
            <Grid item className={classes.message}>
              <StyledMessage>11:30</StyledMessage>
            </Grid>
            <Grid item className={classes.number}>
              <StyledNumber>1</StyledNumber>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MessageItem;
