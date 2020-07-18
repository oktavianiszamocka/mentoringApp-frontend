import 'date-fns';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'
 
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const useStyles = theme => ({
  layout: {
  width: 'auto',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  },
  paper: {
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(5),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
    buttons: {
  display: 'flex',
  justifyContent: 'flex-end',
  },

  textField: {
  marginTop: theme.spacing(1),
  },
  dateGrid:{
    marginTop: theme.spacing(1),
  }
  });
  
class PlanTrip extends Component{
  state = {
    tripName: '',
    city: '',
    country: '',
    zip: '',
    startDate: new Date(),
    endDate: new Date()
  }
  

changeHandler = e  => {
   this.setState({[e.target.name]: e.target.value}) 
}

submitHandler = e  => {
  e.preventDefault()
  console.log(this.state)
  fetch('http://localhost:59131/api/users/2/Trip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.state)
  }).then(r=> r.json().then(res=>{
    if(res){
      console.log("New trip is added")
    }
  }))
}

handleStartDate = (date) => {
  this.setState({
      startDate: date
  });
};
handleEndDate = (date) => {
  this.setState({
      endDate: date
  });
};
  render(){
    const { classes } = this.props
    const { tripName, startDate, city, country, zip, endDate } = this.state
  return (
    <div>  
      <form onSubmit={this.submitHandler}>
        <main className={classes.layout}>
          <Paper className={classes.paper} > 
            <Typography component="h1" variant="h4" align="center">
              Plan your trip
            </Typography> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">   
                <Grid item xs={12}>
                  <TextField 
                    id="tripName"
                    name="tripName"
                    label="Trip name"
                    value = {tripName}
                    onChange = {this.changeHandler}
                    fullWidth
                  />
                </Grid>  
                <Grid container spacing={3} className={classes.dateGrid}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start date"
                      value={startDate}
                      onChange={this.handleStartDate}
                      minDate={new Date()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End date"
                      value={endDate}
                      onChange={this.handleEndDate}
                      minDate={new Date()}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={3} className={classes.textField}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    
                    id="city"
                    name="city"
                    label="City"
                    value = {city}
                    onChange = {this.changeHandler}
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <TextField id="state" name="state" label="State" fullWidth /> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="zip"
                      name="zip"
                      label="Zip / Postal code"
                      onChange = {this.changeHandler}
                      fullWidth
                        autoComplete="billing postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    
                    id="country"
                    name="country"
                    label="Country"
                    value = {country}
                    onChange = {this.changeHandler}
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
              </Grid>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  type = "submit"
                  className={classes.button}>
                  Add Trip
                </Button>
              </div>
            </MuiPickersUtilsProvider>
          </Paper>
        </main>
      </form>
    </div>
    )
  }
}
export default withStyles(useStyles)(PlanTrip)