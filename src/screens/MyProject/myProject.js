import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectInfo from './projectInfo';
import SearchBar from '../shared/components/SearchBar';
import AllNotes from '../shared/components/AllNotes';

const useStyles = makeStyles({
  paging: {
    marginTop: 10,
  },
  search: {
    width: 500,
  },

});

const MyProject = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const loadData = async () => {
    const response = await Promise.all([Api.getMyProject(page)]);
    setProjects(response[0].data.data);
    setCount(response[0].data.totalPages);
  };

  useEffect(async () => {
    loadData();
  }, [page]);

  const searchProject = async (ev) => {
    if (ev.key === 'Enter') {
      const searchQuery = ev.target.value;
      const projectResult = await Promise.all([Api.getMyProjectBySearch(searchQuery, page)]);
      setProjects(projectResult[0].data.data);
    }
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>

        <Header />
        <Grid item xs={3}>
          <AllNotes />

        </Grid>
        <Grid item xs={7}>
          <SearchBar onEnterAction={(e) => searchProject(e)} />

          {projects && projects.map((pro) => (
            <ProjectInfo project={pro} />

          ))}
          <Pagination
            className={classes.paging}
            color="primary"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            onChange={handlePageChange}
          />
        </Grid>

      </Grid>
    </div>
  );
};
export default MyProject;
