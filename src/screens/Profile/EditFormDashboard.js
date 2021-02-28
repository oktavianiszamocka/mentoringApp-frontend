import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import EditForm from './EditForm';
import FormikEditForm from './FormikEditForm';
import AllNotes from '../shared/components/AllNotes';

const EditProfileDashboard = () => {
  const { IdUser } = useParams();
  const [userProfile, setProfile] = useState();

  const loadData = async () => {
    const res = await Promise.all([Api.getUserProfile(IdUser)]);
    setProfile(res[0].data.data);
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
          { userProfile && <FormikEditForm profileInfo={userProfile} />}
        </Grid>
      </Grid>
    </div>
  );
};
export default EditProfileDashboard;
