import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },

  aaaa:{
    width: '55%',
  },
  formControl: {
    
    minWidth: 120,
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  autoComplete: {
    marginTop: theme.spacing(3),
  }
}));

export default function AddClothSpecs() {
  const classes = useStyles();


  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper} > 
        <Grid container justify = "center">
         <img  className={classes.aaaa}  src= "https://source.unsplash.com/9qd0iQ8otbU/600x799" />
         </Grid>
         <Grid item xs={12}>
            <TextField
              id="clothName"
              name="clothName"
              label="Name"
              fullWidth
            />
          </Grid>      

          <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"

              >
                <MenuItem value={'Shirt'}>T-Shirt</MenuItem>
                <MenuItem value={'Shirt'}>Shirt</MenuItem>
                <MenuItem value={'Pants'}>Pants</MenuItem>
              </Select>
              
          </FormControl>
         
                  <Autocomplete className={classes.autoComplete}
                multiple
                id="tags-outlined"
                options={tags}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Purpose"
                    placeholder="Choose tags for cloth"
                  />
                )}
              />
                  <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link} to="/Wardrobe"
                    className={classes.button}>
                    Add Cloth
                  </Button>
                </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
const tags = [
  { title: 'Windy day' },
  { title: 'Rainy day' },
  { title: 'Sunny'},
  { title: 'For colder days'},

];