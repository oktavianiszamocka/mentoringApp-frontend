import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useParams } from 'react-router-dom';
import MeetingList from 'screens/shared/components/MeetingList';
import MeetingsViewProject from './MeetingsViewProject';
import Header from '../../components/Header';
import ProjectBar from '../../components/ProjectBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

}));

function CalendarMainProject() {
  const { IdProject } = useParams();
  const [value, onChange] = useState(new Date());
  const [showNotes, setShowNotes] = useState(false);
  const [clickedMeetingId, setClickedMeetingId] = useState(0);

  const formatDate = (date) => {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) { month = `0${month}`; }
    if (day.length < 2) { day = `0${day}`; }

    return [year, month, day].join('-');
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container spacing={0}>
        <Header />
        <Grid item xs={2}>
          <ProjectBar />
        </Grid>
        <Grid item xs={5}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" gutterBottom style={{ marginBottom: '4vh' }}>Project Calendar</Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center" direction="row" spacing={0}>
                <Grid item justifyContent="center">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                  >
                    <KeyboardDatePicker
                      variant="static"
                      format="MM/dd/yyyy"
                      value={value}
                      onChange={onChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                  <MeetingsViewProject date={formatDate(value)} showNotes={setShowNotes} setMeeting={setClickedMeetingId} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>

          {showNotes ? (
            <div>
              <Typography variant="h4" gutterBottom style={{ marginBottom: '4vh' }}>Meeting Notes</Typography>
              <MeetingList meetingid={clickedMeetingId} />
            </div>
          ) : <div />}
        </Grid>
      </Grid>
    </div>
  );
}

export default CalendarMainProject;
