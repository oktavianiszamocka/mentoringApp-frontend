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

  const loadData = async () => {
    const res = await Promise.all([Api.getProjectDetails(IdProject)]);
    setprojectDetail(res[0].data.data);
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
          {projectDetail && <ProjectDetails projectInfo={projectDetail} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDetailsDashboard;
