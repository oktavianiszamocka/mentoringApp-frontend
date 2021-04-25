import React, {  useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import Milestone from './Milestone';
import AllNotes from '../shared/components/AllNotes';

const MilestoneDashboard = () => {
  
  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <AllNotes />
        </Grid>
        <Grid item xs={8}>
         <Milestone/>
        </Grid>
      </Grid>
    </div>
  );
};

export default MilestoneDashboard;
