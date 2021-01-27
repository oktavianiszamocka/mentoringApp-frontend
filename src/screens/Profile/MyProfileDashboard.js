import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import MyProfile from './MyProfile';
import EditForm from './EditForm';
import AllNotes from '../shared/components/AllNotes';

const MyProfileDashboard = () => {
  const [user, setUser] = useState();
  const [userProfile, setProfile] = useState();

  const loadData = async () => {
    const res = await Promise.all([Api.getUserAvaAndName(), Api.getUserProfile()]);
    setUser(res[0].data.data);
    setProfile(res[1].data.data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <AllNotes />
        </Grid>
        <Grid item xs={8}>
          {user && userProfile && <MyProfile user={user} profileInfo={userProfile} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfileDashboard;
