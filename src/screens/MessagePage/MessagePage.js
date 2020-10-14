import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, colors } from '@material-ui/core';
import AvatarImage from '../../assets/images/avatar.jpg';
import UserAvailability from './UserAvailability';
import SearchBar from './SearchBar';
import MessageForm from '../shared/components/MessageForm'

import '../../index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MessagePage() {
  const classes = useStyles();
  const user = {
    firstName: 'Jan',
    lastName: 'Kowalsi',
    imageUrl: AvatarImage.toString(),
  };

  const isAvailable = false;

  return (
    <div className={classes.root} style={{ margin: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={4} container direction="column" spacing={3}>
          <Grid item>
            <Paper style={{ height: '6rem' }}>
              <SearchBar />
            </Paper>
          </Grid>
          <Grid item>
            <Paper style={{ height: '25rem' }}>chat</Paper>
          </Grid>
        </Grid>
        <Grid item xs={8} container direction="column" spacing={3}>
          <Grid item>
            <UserAvailability user={user} active={isAvailable} />
          </Grid>
          <Grid item>
            <Paper style={{ height: '25rem' }}>chat post
            <MessageForm />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
