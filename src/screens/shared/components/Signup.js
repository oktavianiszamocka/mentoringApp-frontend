import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Grid,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const StyledOuterDiv = styled.div`
  display: flex;
  margin: 5px;
  width: 731px;
  height: 890px;
  background-color: #4A9FCE;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin: 60px auto;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: 15px;
`;

const StyledLabel = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;  
  color: rgba(0,0,0,0.5);
  margin-top: 8px;
  margin-left: 15px;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 185,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 193,
  },
  email: {
    margin: theme.spacing(0),
    minWidth: 400,
  },
  divider: {
    marginTop: '10px',
  },
  check: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    color: 'rgba(0,0,0,0.5)',
  },
  signupbot: {
    marginLeft: '160px',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [role, setRole] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <StyledOuterDiv>
      <StyledSection>
        <StyledDiv>
          <StyledTitle>Sign up</StyledTitle>
          <StyledLabel>Please fill this form to create account</StyledLabel>
          <Divider />
        </StyledDiv>
        <Grid container justify="center" spacing={2} style={{ maxWidth: '500px' }}>
          <Grid item xs={5}>
            <TextField
              id="first-name"
              label="First name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="last-name"
              label="Last name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date of birth"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={5}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="phone"
              label="Phone number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl variant="outlined" className={classes.formControl2}>
              <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={country}
                onChange={handleCountryChange}
                label="Country"
              >
                <MenuItem value="Student">Poland</MenuItem>
                <MenuItem value="Teacher">Ukraine</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="major"
              label="Major"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="semester"
              label="Semester"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              className={classes.email}
              id="email"
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="confirm-password"
              label="Confirm Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={11}>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={11}>
            <FormControlLabel
              className={classes.check}
              control={(
                <Checkbox
                  checked={state.checked}
                  onChange={handleCheckChange}
                  name="checked"
                  color="primary"
                />
        )}
              label="I accept the terms of use and privacy policy"
            />
          </Grid>
          <Grid item xs={11}>
            <Button
              className={classes.signupbot}
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </Grid>
          <Grid item>
            <StyledLabel style={{ marginRight: '30px' }}>
              Already have account? Log in
              {' '}
              <u>here</u>
            </StyledLabel>
          </Grid>
        </Grid>

      </StyledSection>
    </StyledOuterDiv>
  );
};

export default Signup;
