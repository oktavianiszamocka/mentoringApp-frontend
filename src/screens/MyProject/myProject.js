import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Title from '../shared/components/Title';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectInfo from './projectInfo';
import SearchBar from '../shared/components/SearchBar';

const StyledBox = styled(Box)({
  padding: '1.5rem',
  marginTop: '2rem',
  marginRight: '3rem',
  width: '12rem',
  boxShadow: '1px 1px 2px grey',
});

const MyProject = () => {
  const [projects, setProjects] = useState([]);

  const loadData = async () => {
    const response = await Promise.all([Api.getMyProject()]);
    setProjects(response[0].data.data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>

        <Header />
        <Grid item xs={3}>
          <StyledBox>
            <Title text="Notes" />

          </StyledBox>

        </Grid>
        <Grid item xs={7}>
          <SearchBar />
          {projects && projects.map((pro) => (
            <ProjectInfo project={pro} />

          ))}
        </Grid>

      </Grid>
    </div>
  );
};
export default MyProject;
