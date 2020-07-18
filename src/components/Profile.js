import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(2),
    
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
    },
      buttons: {
    display: 'flex',
  },

  textField: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    width: 128,
  },
  }));
  
export default function Profile() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper} > 
            <Typography component="h1" variant="h4" align="center">
            Edit Profile
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="username"
                  name="username"
                  label="Username"
                  fullWidth
                  autoComplete="username"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="mail"
                  name="mail"
                  label="Email address"
                  fullWidth
                  autoComplete="mail"
                />
              </Grid>
                
            </Grid>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="billing address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="state" name="state" label="State" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                </Grid>
            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link} to="/Profile"
                    className={classes.button}>
                    Update Profile
                </Button>
            </div>

        </Paper>
      </main>
    </React.Fragment>
  );
}
