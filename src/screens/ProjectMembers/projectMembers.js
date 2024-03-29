import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import AlertLab from '@material-ui/lab/Alert';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import MemberAvatar from './member';
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
  alert: {
    backgroundColor: 'rgba(255,165,0,0.2)',
    color: 'black',

  },

});

const ProjectMembersBoard = () => {
  const { IdProject } = useParams();
  const classes = useStyles();
  const [members, setMembers] = useState([]);

  const loadData = async () => {
    const response = await Promise.all([Api.getProjectMembers(IdProject)]);
    setMembers(response[0].data.data);
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
            <Typography variant="h4" gutterBottom>Project Members</Typography>

          </Grid>

          <Grid item xs={8} container spacing={4} lg="true" justify="center">

            {members && members.map((memberPro) => (
              <Grid item xs={3}>
                <MemberAvatar member={memberPro} />
              </Grid>

            ))}

            {members.length === 0
                            && (
                            <div>
                              <AlertLab
                                severity="warning"
                                className={classes.alert}
                              >
                                There are no project members yet!
                              </AlertLab>
                            </div>
                            )}

          </Grid>
        </div>

      </Grid>
    </div>

  );
};

export default ProjectMembersBoard;
