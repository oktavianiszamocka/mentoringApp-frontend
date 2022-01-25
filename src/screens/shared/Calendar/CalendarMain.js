import React, { useState } from 'react';
import {
  Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function CalendarMain() {
  const [value, onChange] = useState(new Date());

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
