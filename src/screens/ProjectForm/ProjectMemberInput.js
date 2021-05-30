import React, { useState } from 'react';
import {
  TextField, Grid, Button, FormControl,
} from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),

    },
    flexGrow: 1,

  },
  fieldStyle: {
    width: '100%',
    margin: '3px',

  },

}));

const ProjectMembersInput = ({ email, role }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12} container spacing={2} alignItems="flex-start" justify="center">
        <Grid item xs={6}>
          <TextField
            id="standard-read-only-input"
            label="Project Member Email"
            variant="outlined"
            className={classes.fieldStyle}
            defaultValue={email}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="standard-read-only-input"
            label="Role"
            variant="outlined"
            className={classes.fieldStyle}
            defaultValue={role}
            InputProps={{
              readOnly: true,
            }}
          />

        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectMembersInput;
