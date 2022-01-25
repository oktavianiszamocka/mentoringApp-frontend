import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

const StyledDiv = styled.div`
  position: absolute;
  padding: 10px;
  max-width: 600px;
  min-width: 420px;
  min-height: 400px;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 18px;
  color: #616366;
  margin: 8px;
`;

const StyledP2 = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 15px;
  color: black;
`;

const useStyles = makeStyles({
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    width: '150px',
  },
  noteContainer: {
    padding: '5px 15px',
    minHeight: '100px',
  },
  button: {
    fontFamily: 'Roboto',
    fontSize: '13px',
    height: '30px',
    width: '50px',
  },
});

const MeetingDetails = (props) => {
  const classes = useStyles();

  return (
    <StyledDiv>
      <Grid container direction="row">
        <Grid item lg={9}>
          <Typography variant="h6" className={classes.title}>
            {props.details.title}
          </Typography>
        </Grid>

      </Grid>
      <div className={classes.demo}>
        <StyledP>
          Subject:
          {' '}
          {props.details.subject}
        </StyledP>
        <StyledP>
          Author:
          {' '}

          {props.details.authorFirstName}
          {' '}
          {props.details.authorLastName}
        </StyledP>
      </div>
      <Paper className={classes.noteContainer}>
        <StyledP2>
          {props.details.note1}

        </StyledP2>
      </Paper>
    </StyledDiv>

  );
};

export default MeetingDetails;
