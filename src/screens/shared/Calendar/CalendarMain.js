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

  return (
    <Grid container justifyContent="center" spacing={0}>
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
      <Grid item>
        <MeetingsView />
      </Grid>
    </Grid>
  );
}

export default CalendarMain;
