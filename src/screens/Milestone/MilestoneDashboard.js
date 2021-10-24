import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Paper, Typography, Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import MilestoneLine from './MilestoneLine';
import ProjectBar from '../shared/components/ProjectBar';
import NewMilestoneForm from './NewMilestoneForm';

const useStyles = makeStyles({
  root: {

    marginTop: '6rem',
  },
  paging: {
    marginTop: 10,
  },
  search: {
    width: 500,
  },

});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MilestoneDashboard = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { IdProject } = useParams();
  const classes = useStyles();
  const defaultSucessMsg = 'New project milestone has been set succesfully!';
  const defaultMilestoneValue = {
    idMilestone: '',
    description: '',
  };
  const [milestones, setMilestones] = useState([]);
  const [newMilestoneVisible, setNewMilestoneVisible] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [milestoneInitialValue, setMilestoneInitialValue] = useState(defaultMilestoneValue);
  const [idMilestoneToEdit, setIdMilestone] = useState('');

  const [successMsg, setSuccessMsg] = useState(defaultSucessMsg);
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = async () => {
    const res = await Promise.all([Api.getProjectMilestones(IdProject)]);
    setMilestones(res[0].data.data);
  };

  useEffect(() => {
    loadData();
  });

  useEffect(() => {
    setNewMilestoneVisible(true);
    window.scrollTo(0, 0);
  }, [milestoneInitialValue]);

  const handlePostMilestoneSubmit = async (e) => {
    const newMilestoneData = {
      Description: e.description,
      Project: IdProject,
      isDone: false,
    };

    await Api.addNewMilestone(newMilestoneData)
      .then((response) => {
        setOpen(true);
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
        setOpen(true);
      });

    const getProjectMilestones = await Api.getProjectMilestones(IdProject) // needs to be updated
      .then((response) => response.data);
    setMilestones(getProjectMilestones.data);
  };

  const handleUpdateMilestone = async (e) => {
    const milestoneDataEdit = {
      idMilestone: idMilestoneToEdit,
      description: e.description,
    };

    await Api.editMilestone(milestoneDataEdit)
      .then((response) => {
        setSuccessMsg('Milestone description has been changed!');
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setSuccessMsg(defaultSucessMsg);
        }, 2000);
      }).catch((err) => {
        setErrorMsg(err.response.data);
      }).finally(() => {
        setIsUpdate(false);
      });

    const getProjectMilestones = await Api.getProjectMilestones(IdProject) // needs to be updated
      .then((response) => response.data);
    setMilestones(getProjectMilestones.data);
  };

  const editMilestoneAction = (idMilestone, description) => {
    setIdMilestone(idMilestone);
    setNewMilestoneVisible(false);
    const milestoneToEdit = {
      idMilestone,
      description,
    };

    setMilestoneInitialValue(milestoneToEdit);
    setIsUpdate(true);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <ProjectBar />

        </Grid>

        <Grid item xs={5} justify="center" alignItems="center">

          {milestones
              && milestones.map((mile) => (
                <MilestoneLine milestone={mile} onEditHandler={() => editMilestoneAction(mile.idMilestone, mile.description)} />

              ))}

        </Grid>
        <Grid item xs={4}>
          <Snackbar
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            open={open}
            autoHideDuration={2000}
            onClose={handleCloseSnackBar}
          >
            <Alert onClose={handleCloseSnackBar} severity="success">
              {successMsg}
            </Alert>

          </Snackbar>
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          {newMilestoneVisible && (
            <NewMilestoneForm
              onSubmitHandler={isUpdate ? handleUpdateMilestone : handlePostMilestoneSubmit}
              initialValues={milestoneInitialValue}
              formState={isUpdate ? 'Edit' : 'New'}

            />
          )}

        </Grid>

      </Grid>
    </div>
  );
};

export default MilestoneDashboard;
