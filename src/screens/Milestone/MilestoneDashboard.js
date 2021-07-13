import React, { useState, useEffect } from 'react';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import AllNotes from '../shared/components/AllNotes';
import MilestoneLine from './MilestoneLine';
import styled from 'styled-components';
import ProjectBar from '../shared/components/ProjectBar';
import NewMilestoneForm from './NewMilestoneForm'
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Button, Paper, Typography,
  } from '@material-ui/core';

  const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '6rem',
    },
    paging: {
        marginTop: 10,
    },
    search: {
        width: 500,
    },

});

const MilestoneDashboard = () => {
    const classes = useStyles();
    const [milestones, setMilestones] = useState([]);
    
    
    
    const loadData = async () => {
        const res = await Promise.all([Api.getProjectMilestones(5)]);
        setMilestones(res[0].data.data);
    }
  

    useEffect(async () => {
      
      loadData();
    }, []);
  
    return (
      <div className={classes.root}>
        <Grid container >
        <Header />
        <Grid item xs={2}>
          <ProjectBar />
         
        </Grid >
        
          <Grid item xs={3} justify="center" alignItems="center" >
                                   
              {milestones &&
                milestones.map((mile) => (
                  <MilestoneLine milestone={mile} />
                 
                ))  }
    
          </Grid>
          <Grid item xs={4}>
          
        <NewMilestoneForm/>
          </Grid>


          <Grid item xs={3}>
          <AllNotes />
        </Grid>
        </Grid>
      </div>
    );
  };
  
  export default MilestoneDashboard;