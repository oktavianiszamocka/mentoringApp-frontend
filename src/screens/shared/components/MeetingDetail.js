import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: absolute;
  padding: 10px;
  max-width: 600px;
  min-width: 400px;
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
  const history = useHistory();

  const routeChange = () => {
    const path = '/meeting_notes';
    history.push(path);
  };

  return (
    <StyledDiv>
      <Grid container direction="row">
        <Grid item lg={9}>
          <Typography variant="h6" className={classes.title}>
            {props.location.detailProps.allData.title}
          </Typography>
        </Grid>
        <Grid item lg={3}>
          <Button variant="contained" color="primary" className={classes.button} onClick={routeChange}>Back</Button>
        </Grid>
      </Grid>
      <div className={classes.demo}>
        <StyledP>
          Subject:
          {' '}
          {props.location.detailProps.allData.subject}
        </StyledP>
        <StyledP>
          Author:
          {' '}
          {props.location.detailProps.allData.author}
        </StyledP>
      </div>
      <Paper className={classes.noteContainer}>
        <StyledP2>
          {props.location.detailProps.allData.note1}

        </StyledP2>
      </Paper>
    </StyledDiv>

  );
};

export default MeetingDetails;
