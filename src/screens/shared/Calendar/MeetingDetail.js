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
   font-size: 16px;
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

const StyledUnderTitleGoing = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #4f5052;
   margin-right: 20px;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;
  margin: 0px;
`;

const StyledTime = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;
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
  buttons: {
    padding: '2px',
    fontSize: '10px',
    marginTop: '10px',
    marginLeft: '5px',
  },
}));

const MeetingDetail = (props) => {
  const classes = useStyles();
  const positionX = `${props.cardPosition[0]}`;
  const positionY = `${props.cardPosition[1]}`;

  const [editMeetingVisible, setEditMeetingVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [location, setLocation] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  const styles = {
    top: '150px',
    left: '450px',
    position: 'absolute',
    zIndex: 5,
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await Promise.all([Api.getMeetingDetail(props.meetingId)]);
      console.log(res[0].data.data);
      setTitle(res[0].data.data.title);
      setDescription(res[0].data.data.description);
      setStart(res[0].data.data.startTime);
      setEnd(res[0].data.data.endTime);
      setLocation(res[0].data.data.location);
      setAssignedUsers(res[0].data.data.meetingAttendee);
    };

    loadData();
  }, [props.meetingId]);

  const showEdit = () => {
    console.log('eeeedit');
    setEditMeetingVisible(true);
  };

  return (
    <StyledDiv style={styles}>
      <Grid container direction="row" className={classes.grid}>
        <Grid item>
          <StyledTitle>{title}</StyledTitle>
        </Grid>
        <EditIcon
          className={classes.edit}
          onClick={showEdit}
        />
        <CloseIcon className={classes.close} onClick={() => props.showDet()} />
      </Grid>
      <StyledUnderTitle>TIME</StyledUnderTitle>
      <StyledTime>
        {start}
        {' '}
        -
        {' '}
        {end}
      </StyledTime>
      <Divider />

      <StyledUnderTitle>DESCRIPTION</StyledUnderTitle>
      <StyledDescription>{description}</StyledDescription>
      <Divider />
      <StyledUnderTitle>LOCATION</StyledUnderTitle>
      <StyledDescription>{location}</StyledDescription>
      <Divider />
      <Grid container direction="row">
        <StyledUnderTitle>ASIGNEES</StyledUnderTitle>
        {assignedUsers.length > 0 ? (
          assignedUsers.map((item) => (
            <Grid container direction="row">

              <Grid item>
                <MaterialAvatar
                  className={classes.avatar2}
                  src={item.imageUrl}
                />
              </Grid>
              <Grid item>
                <div>
                  <StyledP style={{ marginTop: '2px' }}>
                    {item.firstName}
                    {' '}
                    {item.lastName}
                  </StyledP>
                </div>
              </Grid>
            </Grid>
          ))) : (
            <div />
        )}
        {editMeetingVisible && (
        <MeetingEdit close={setEditMeetingVisible} />
        )}
      </Grid>
      <Divider />
      <Grid container direction="row">
        <Grid item>
          <StyledUnderTitleGoing>GOING?</StyledUnderTitleGoing>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" color="primary" className={classes.buttons}>YES</Button>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" color="primary" className={classes.buttons}>NO</Button>
        </Grid>

      </Grid>
    </StyledDiv>
  );
};

export default MeetingDetail;
