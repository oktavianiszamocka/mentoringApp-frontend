import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import MyProfile from './MyProfile';
import AllNotes from '../shared/components/AllNotes';

const MyProfileDashboard = () => {
  const { IdUser } = useParams();
  const [showEditButton, setShowEditButton] = useState(false);
  const [userProfile, setProfile] = useState();

  const isShowEditButton = () => {
    if (Api.getUserId() == IdUser) {
      setShowEditButton(true);
    }
  };

  const loadData = async () => {
    const res = await Promise.all([Api.getUserProfile(IdUser)]);
    setProfile(res[0].data.data);
    isShowEditButton();
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
          { userProfile && <MyProfile showEditButton={showEditButton} profileInfo={userProfile} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfileDashboard;
