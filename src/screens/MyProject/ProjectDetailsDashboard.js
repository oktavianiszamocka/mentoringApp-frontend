import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectDetails from './projectDetails';
import ProjectBar from '../shared/components/ProjectBar';

const ProjectDetailsDashboard = () => {
  const { IdProject } = useParams();
  const [projectDetail, setprojectDetail] = useState();
  const [errorMsg, setErrorMsg] = useState();

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

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <ProjectBar />
        </Grid>
        <Grid item xs={8}>
          {errorMsg && <span>Error in system</span>}

          {projectDetail && <ProjectDetails projectInfo={projectDetail} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDetailsDashboard;
