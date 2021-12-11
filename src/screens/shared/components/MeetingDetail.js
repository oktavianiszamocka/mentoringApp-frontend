import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

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

const MeetingDetails = () => {
  const classes = useStyles();

  return (
    <StyledDiv>
      <Typography variant="h6" className={classes.title}>
        Meeting 1 Note
      </Typography>
      <div className={classes.demo}>
        <StyledP>Subject: AAAA</StyledP>
        <StyledP>Author: AAAA</StyledP>
      </div>
      <Paper className={classes.noteContainer}>
        <StyledP2>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

        </StyledP2>
      </Paper>
    </StyledDiv>

  );
};

export default MeetingDetails;
