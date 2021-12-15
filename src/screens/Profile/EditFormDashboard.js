import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import NewFormikEditForm from './NewFormikEditForm';
import AllNotes from '../shared/components/AllNotes';
// import classes from '*.module.css';

const useStyles = makeStyles({
  root: {
    marginTop: '6rem',
  },
});

const EditProfileDashboard = () => {
  const classes = useStyles();
  const { IdUser } = useParams();
  const [userProfile, setProfile] = useState();

  const loadData = async () => {
    const res = await Promise.all([Api.getUserProfile(IdUser)]);
    console.log(`USER INITIAL ${res[0].data.data}`);
    setProfile(res[0].data.data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <AllNotes />
        </Grid>
        <Grid item xs={8}>
          { userProfile && <NewFormikEditForm profileInfo={userProfile} />}
        </Grid>
      </Grid>
    </div>
  );
};
export default EditProfileDashboard;
