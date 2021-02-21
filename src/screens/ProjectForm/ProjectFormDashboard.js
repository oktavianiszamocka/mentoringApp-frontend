import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectInfoForm from './projectInfoForm';

const useStyles = makeStyles({
  membersDiv: {
    flexGrow: 1,

  },
  box: {
    padding: '1.5rem',
    marginTop: '2rem',
    marginRight: '2rem',
    width: '12rem',
    boxShadow: '1px 1px 2px grey',
  },
  paperLeft: {
    height: '25rem',
    width: '15rem',

  },

});

const ProjectFormBoard = () => {
  const classes = useStyles();

  const [projectInfoInitialValues, setProjectInfoInitialValue] = useState();

  const loadData = async () => {
    // const response = await Promise.all([Api.getProjectMembers(IdProject)]);
    // setMembers(response[0].data.data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  const handleProjectInfoSubmit = async (e) => {
    console.log(e);
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <Paper className={classes.paperLeft}>LEFT</Paper>
        </Grid>

        <div className={classes.membersDiv}>
          <Grid item xs={8}>
            <Typography variant="h4" gutterBottom>Project Members</Typography>

          </Grid>
          <Grid item xs={10}>
            <ProjectInfoForm onSubmit={handleProjectInfoSubmit} />

          </Grid>

        </div>

      </Grid>
    </div>

  );
};

export default ProjectFormBoard;
