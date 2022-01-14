import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import MeetingDetail from './MeetingDetail';
import MeetingAdd from './MeetingAdd';
import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: white;
  max-width: 150px;
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
    width: '20px',
    height: '20px',
  },
  editIcon: {
    color: '#989a9e',
    paddingLeft: '2px',
    width: '20px',
    height: '20px',
  },
  title: {
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '700',
    width: '130px',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
  },
  time: {
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
  },
  list: {
    listStyleType: 'circle',
  },
});

const MeetingsView = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [showDetail, setShowDetail] = useState(false);
  const [cardPosition, setcardPosition] = useState([]);
  const [newMeetingVisible, setNewMeetingVisible] = useState(false);
  const [userMeetings, setUserMeetings] = useState([]);
  const [clickedMeeting, setClickedMeeting] = useState(0);

  const compare = (a, b) => {
    const time1 = parseFloat(a.startTime.slice(0, -3).replace(':', '.'));
    const time2 = parseFloat(b.startTime.slice(0, -3).replace(':', '.'));
    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await Promise.all([Api.getUserMeetings(Api.getUserId(), props.date)]);
      res[0].data.data.sort(compare);

      setUserMeetings(res[0].data.data);
    };

    loadData();
  }, [props.date]);

  const delMeeting = async (id) => {
    await Api.deleteMeeting(id)
      .then(async () => {
        const res = await Promise.all([Api.getUserMeetings(props.date)]);
        res[0].data.data.sort(compare);
        setUserMeetings(res[0].data.data);
      });
  };

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
    const className = e.target.getAttribute('class');
    const id = e.target.getAttribute('id');
    if (id && id !== 'del_button') {
      const meetingId = id.slice(id.indexOf('list-item ') + 'list-item '.length);
      setClickedMeeting(meetingId);
      setShowDetail(true);
    }
    console.log(className);

    if (className === 'MuiSvgIcon-root makeStyles-deleteIcon-8') {
    } else {
    }
  // getPositionXY(e.target.id);
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
        <List dense className={classes.list}>
          {userMeetings.length > 0 ? (
            userMeetings.map((item) => {
              const labelId = `list-item ${item.idMeeting}`;
              return (
                <ListItem
                  key={item.idMeeting}
                  button
                  onClick={showDetails}
                  id={`list-item ${item.idMeeting}`}
                >
                  <ListItemText
                    disableTypography
                    primary={(
                      <div>
                        <Typography
                          type="body2"
                          id={`list-item ${item.idMeeting}`}
                          className={classes.title}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          type="body2"
                          id={`list-item ${item.idMeeting}`}
                          className={classes.time}
                        >
                          {' '}
                          {item.startTime.slice(0, -3)}
                          {' '}
                          -
                          {' '}
                          {item.endTime.slice(0, -3)}
                        </Typography>

                      </div>
                    )}
                  />
                  <HighlightOffIcon id="del_button" className={classes.deleteIcon} onClick={() => delMeeting(item.idMeeting)} />
                </ListItem>
              );
            })
          ) : (
            <div />
          )}
        </List>
        {(() => {
          if (showDetail) {
            return (
              <MeetingDetail cardPosition={cardPosition} showDet={hideDet} meetingId={clickedMeeting} date={props.date} setMeetings={setUserMeetings} />
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
        <MeetingAdd close={setNewMeetingVisible} date={props.date} setMeetings={setUserMeetings} />
        )}
      </Grid>
    </StyledDiv>
  );
};

export default MeetingsView;
