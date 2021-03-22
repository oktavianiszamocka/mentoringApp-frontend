import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import PromoterAvatar from './promoter';
import ProjectBar from '../shared/components/ProjectBar';

const useStyles = makeStyles({
  root: {
    marginTop: '6rem',
  },
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
  additionalText: {
    marginTop: '1.5rem',
  },

});

const ProjectPromotersBoard = () => {
  const { IdProject } = useParams();
  const classes = useStyles();
  const [promoters, setPromoters] = useState();

  const loadData = async () => {
    const response = await Promise.all([Api.getProjectPromoters(IdProject)]);
    setPromoters(response[0].data.data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <ProjectBar />
        </Grid>

        <div className={classes.membersDiv}>
          <Grid item xs={8}>
            <Typography variant="h4" gutterBottom>Project Promoters</Typography>

          </Grid>
          <Grid item xs={12} justify="center">
            <Typography align="center" variant="h4" gutterBottom> Main Promoter</Typography>
            {promoters

            && <PromoterAvatar promoter={promoters.mainMentor} />}

            <div className={classes.additionalText}>
              <Typography align="center" variant="h4" gutterBottom> Additional Promoters</Typography>

            </div>

          </Grid>

          <Grid item xs={12} container spacing={3} justify="center">

            {promoters && promoters.additionalMentors.map((promoter) => (
              <Grid item xs={3}>
                <PromoterAvatar promoter={promoter} />

              </Grid>

            ))}

          </Grid>
        </div>

      </Grid>
    </div>

  );
};

export default ProjectPromotersBoard;
