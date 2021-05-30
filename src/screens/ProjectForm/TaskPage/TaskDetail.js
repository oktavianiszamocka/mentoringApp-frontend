import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: absolute;
  right: 10%;
  max-width: 250px;
  max-height: 450px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #9e9e99;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 15px;
   font-weight: bold;
`;
const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #616366;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #616366;
  margin: 0px;
`;

const StyledDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: black;
`;

const useStyles = makeStyles({
  avatar: {
    fontSize: '30px',
    marginRight: '5px',
  },
  close: {
    fontSize: '20px',
    marginLeft: '100px',
  },
  grid: {
    marginBottom: '-15px',
  },
});

const TaskDetail = (handleClose) => {
  const classes = useStyles();

  return (
    <StyledDiv>
      <Grid container direction="row" className={classes.grid}>
        <Grid item>
          <StyledTitle>Design Wireframe</StyledTitle>
        </Grid>
        <CloseIcon className={classes.close} onClick={handleClose} />
        <Grid item />
      </Grid>
      <StyledUnderTitle>Created by:</StyledUnderTitle>
      <Grid container direction="row">
        <Grid item>
          <AccountCircleIcon className={classes.avatar} />
        </Grid>
        <Grid item>
          <div>
            <StyledP>Joanna Bienkowska</StyledP>
            <StyledP>On Thursday 08/05/2021</StyledP>
          </div>
        </Grid>
      </Grid>
      <StyledDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. </StyledDescription>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>PRIORITY</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '15px' }}>HIGH</StyledUnderTitle>
        </Grid>
      </Grid>
      <Divider />
      <StyledUnderTitle>ASIGNEES</StyledUnderTitle>
      <Grid container direction="row">
        <Grid item>
          <AccountCircleIcon className={classes.avatar} />
        </Grid>
        <Grid item>
          <div>
            <StyledP style={{ marginTop: '7px' }}>Joanna Bienkowska</StyledP>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item>
          <AccountCircleIcon className={classes.avatar} />
        </Grid>
        <Grid item>
          <div>
            <StyledP style={{ marginTop: '7px' }}>Amon Amoniasty</StyledP>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>Status</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '15px' }}>In progress</StyledUnderTitle>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>Deadline</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '15px' }}>Saturday 21, May 2021</StyledUnderTitle>
        </Grid>
      </Grid>
      <Divider />

      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitle>Start date</StyledUnderTitle>
        </Grid>
        <Grid item>
          <StyledUnderTitle style={{ marginLeft: '15px' }}>Monday 11, May 2021</StyledUnderTitle>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default TaskDetail;
