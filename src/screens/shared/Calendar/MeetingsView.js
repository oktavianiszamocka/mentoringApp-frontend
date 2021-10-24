import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Avatar from '@material-ui/core/Avatar';
import MeetingDetail from './MeetingDetail';
import MeetingAdd from './MeetingAdd';

const StyledDiv = styled.div`
  background-color: white;
  min-width: 150px;
  min-height: 360px;
  border-left: 1px solid #9e9e99;
`;
const StyledDiv2 = styled.div`
  background-color: #3f51b5;
  min-width: 150px;
  min-height: 100px;
  margin: 0;
`;

const StyledP = styled.p`
  font-family: 'Roboto', arial;
  font-size: 25px;
  color: white;
  background-color: #3f51b5;
  text-align: center;
  margin-top: 40px;
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
  button: {
    width: '20px',
    marginTop: '5px',
    marginLeft: '50px',
  },
  deleteIcon: {
    color: '#989a9e',
    marginLeft: '15px',
    width: '20px',
    height: '20px',
  },
  title: {
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
  },
});

const MeetingsView = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [showDetail, setShowDetail] = useState(false);
  const [cardPosition, setcardPosition] = useState([]);
  const [newMeetingVisible, setNewMeetingVisible] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getPositionXY = (labelId) => {
    const element = document.getElementById(labelId);
    console.log(element);
    const rect = element.getBoundingClientRect();
    const { x } = rect;
    const { y } = rect;
    setcardPosition([x, y]);
  };

  const showDetails = (e) => {
    setShowDetail(true);
    getPositionXY(e.target.id);
  };

  const hideDet = () => {
    console.log('hidding...');
    setShowDetail(false);
  };

  return (
    <StyledDiv>
      <Grid container direction="column" className={classes.grid}>
        <StyledDiv2>
          <StyledP>Meetings</StyledP>
        </StyledDiv2>
        <List dense className={classes.root}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `list-item ${value}`;
            return (
              <ListItem
                key={value}
                button
                onClick={showDetails}
                id={`list-item ${value}`}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                    id={`list-item ${value}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={(
                    <Typography
                      type="body2"
                      id={`list-item ${value}`}
                      className={classes.title}
                    >
                      My Meeting
                      {value}
                    </Typography>
)}
                />
                <HighlightOffIcon className={classes.deleteIcon} />
              </ListItem>
            );
          })}
        </List>
        {(() => {
          if (showDetail) {
            return (
              <MeetingDetail cardPosition={cardPosition} showDet={hideDet} />
            );
          }
        })()}
        <Button
          onClick={() => setNewMeetingVisible(true)}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add
        </Button>
        {newMeetingVisible && (
        <MeetingAdd close={setNewMeetingVisible} />
        )}
      </Grid>
    </StyledDiv>
  );
};

export default MeetingsView;
