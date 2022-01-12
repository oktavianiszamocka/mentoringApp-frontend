import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: absolute;
  padding: 10px;
  max-width: 600px;
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
  },
});

const MeetingDetails = (props) => {
  const classes = useStyles();
  const location = useLocation();
  // const { from } = location.state;

  console.log(props.location.detailProps.allData);

  return (
    <StyledDiv>
      <Typography variant="h6" className={classes.title}>
        {props.location.detailProps.allData.title}
      </Typography>
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
