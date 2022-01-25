import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectDetails from './projectDetails';
import ProjectBar from '../shared/components/ProjectBar';
import ConfirmDialog from '../shared/components/ConfirmDialog';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProjectDetailsDashboard = () => {
  const { IdProject } = useParams();
  const [projectDetail, setprojectDetail] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setsuccessMsg] = useState();

  const [deleteProjectDialogOptions, setDeleteProjectDialogOptions] = useState({
    title: 'Delete Project',
    mainText: 'Are you sure you want to delete this project?',
    id: null,
    open: false,
  });

  const loadData = async () => {
    setErrorMsg(null);
    await Api.getProjectDetails(IdProject)
      .then((response) => {
        setprojectDetail(response.data.data);
      }).catch((err) => {
        setErrorMsg(err.response.data);
      });
  };

  useEffect(async () => {
    loadData();
  }, []);

  const onProjectDeleteHandler = (id) => {
    setDeleteProjectDialogOptions({
      ...deleteProjectDialogOptions,
      open: true,
      id,
    });
  };

  const deleteProject = async (confirmed, idProject) => {
    if (confirmed) {
      setErrorMsg(null);
      await Api.deleteProject(idProject)
        .then(() => {
          setsuccessMsg('Project is deleted successfully!');
          setTimeout(() => {
            setsuccessMsg(null);
            window.location.href = '/myproject';
          }, 5000);
        }).catch((err) => {
          setErrorMsg(err.response.data);
        });
    }

    setDeleteProjectDialogOptions({
      ...deleteProjectDialogOptions,
      open: false,

    });
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <ProjectBar />
        </Grid>
        <Grid item xs={8}>
          <ConfirmDialog {...deleteProjectDialogOptions} onDialogClosed={deleteProject} />
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          {projectDetail
          && (
          <ProjectDetails
            projectInfo={projectDetail}
            onDeleteHandler={() => onProjectDeleteHandler(IdProject)}
          />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDetailsDashboard;
