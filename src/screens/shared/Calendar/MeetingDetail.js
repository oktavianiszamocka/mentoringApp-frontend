import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import MaterialAvatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import MeetingEdit from './MeetingEdit';
import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: white;
  position: absolute;
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
   width: 160px;
   color: #4f5052;

`;
const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #4f5052;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;
  margin: 0px;
`;

const StyledDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;

`;

const useStyles = makeStyles((theme) => ({
  avatar1: {
    fontSize: '30px',
    marginRight: '5px',
    marginTop: '-5px',
  },
  avatar2: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '5px',
    marginTop: '-5px',
    marginBottom: '5px',

  },
  close: {
    fontSize: '20px',
    marginLeft: '10px',
  },
  edit: {
    fontSize: '18px',
    marginLeft: '10px',
  },
  grid: {
    marginBottom: '-15px',
  },

}));

const MeetingDetail = (props) => {
  const classes = useStyles();
  const positionX = `${props.cardPosition[0]}`;
  const positionY = `${props.cardPosition[1]}`;

  const [editMeetingVisible, setEditMeetingVisible] = useState(false);

  const styles = {
    top: '150px',
    left: '450px',
    position: 'absolute',
    zIndex: 5,
  };

  console.log(positionX);
  console.log(positionY);

  const showEdit = () => {
    console.log('eeeedit');
    setEditMeetingVisible(true);
  };

  return (
    <StyledDiv style={styles}>
      <Grid container direction="row" className={classes.grid}>
        <Grid item>
          <StyledTitle>Meeting 1</StyledTitle>
        </Grid>
        <EditIcon
          className={classes.edit}
          onClick={showEdit}
        />
        <CloseIcon className={classes.close} onClick={() => props.showDet()} />
        <Grid item />
      </Grid>
      <StyledUnderTitle>Created by:</StyledUnderTitle>
      <Grid container direction="row">
        <Grid item>
          <MaterialAvatar
            className={classes.avatar1}
          />
        </Grid>
        <Grid item>
          <div>
            <StyledP>
              Jan Kowalski
            </StyledP>
            <StyledP>20.06.2020</StyledP>
          </div>
        </Grid>
      </Grid>
      <StyledDescription>We need to meet to discus frontend</StyledDescription>
      <Divider />
      <Grid container direction="row">
        <StyledUnderTitle>PEOPLE</StyledUnderTitle>
        <Grid container direction="row">
          <Grid item>
            <MaterialAvatar
              className={classes.avatar2}
            />
          </Grid>
          <Grid item>
            <div>
              <StyledP style={{ marginTop: '2px' }}>
                Maria Wilk
              </StyledP>
            </div>
          </Grid>
        </Grid>
        {editMeetingVisible && (
        <MeetingEdit close={setEditMeetingVisible} />
        )}
      </Grid>
    </StyledDiv>
  );
};

export default MeetingDetail;
