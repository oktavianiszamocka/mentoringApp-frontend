import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CalendarForm from './CalendarForm';
import MeetingsView from './MeetingsView';

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

function CalendarMain() {
  const [value, onChange] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const formatDate = (date) => {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) { month = `0${month}`; }
    if (day.length < 2) { day = `0${day}`; }

    return [year, month, day].join('-');
  };

  return (
    <Grid container justifyContent="center" direction="row" spacing={0}>
      <Grid item>
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
    </Grid>
  );
}

export default CalendarMain;
