import React, { useState, useEffect } from 'react';
import {
  Grid, Button, InputLabel, Select, MenuItem, FormControl,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
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
    width: '100%',
    margin: 'auto',
  },
  alert: {
    backgroundColor: 'rgba(255,165,0,0.2)',
    color: 'black',
    width: '280px',
    margin: '20px 30%',

  },
  gridItem: {
    margin: 'auto',

  },
  projects: {

    marginTop: '2rem',
    // marginLeft: '5rem',

  },
  selectStudies: {
    width: '100%',
  },
  formControl: {
    display: 'block',

    minWidth: 120,
    width: '100%',
  },

});

const MyProject = () => {
  const classes = useStyles();
  const defaultErrorMsg = 'Sorry! You have no projects assigned to you';
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [studies, setStudies] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState('');
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [errorMsg, setErrorMsg] = useState(defaultErrorMsg);

  const loadData = async () => {
    const response = await Promise.all([Api.getMyProject(page), Api.getProjectStudies(), Api.getProjectModes()]);
    setProjects(response[0].data.data);
    setCount(response[0].data.totalPages);
    setStudies(response[1].data.data);
    setModes(response[2].data.data);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const searchProjectHandler = async () => {
    setErrorMsg(defaultErrorMsg);
    let concatUrl = '';
    if (searchWord !== '' || searchWord !== null) {
      concatUrl += `projectName=${searchWord}&`;
    }
    if (selectedStudy !== '') {
      concatUrl += `study=${selectedStudy}&`;
    }
    if (selectedMode !== '') {
      concatUrl += `mode=${selectedMode}&`;
    }
    console.log(concatUrl);
    const projectResult = await Api.getMyProjectBySearch(concatUrl, 1)
      .then((response) => {
        console.log(response.data.totalRecords);
        setProjects(response.data.data);
        setCount(response.data.totalPages);
      })
      .catch((error) => {
        setErrorMsg(error.response.data);
        setProjects([]);
      });
  };

  useEffect(() => {
    searchProjectHandler();
  }, [selectedStudy, selectedMode, searchWord]);

  const searchProject = async (ev) => {
    if (ev.key === 'Enter') {
      const searchQuery = ev.target.value;
      setSearchWord(searchQuery);

      // const projectResult = await Promise.all([Api.getMyProjectBySearch(searchQuery, page)]);
      // setProjects(projectResult[0].data.data);
      // setSearchWord('');
    }
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleChangeStudies = (e) => {
    setSelectedStudy(e.target.value);
  };

  const handleChangeModes = (e) => {
    setSelectedMode(e.target.value);
  };
  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>

        <Header />
        <Grid item xs={3}>
          <AllNotes />

        </Grid>
        <Grid item xs={8} container spacing={2} className={classes.gridItem}>
          <SearchBar styleSearch={classes.search} onEnterAction={(e) => searchProject(e)} />

          <Grid item xs={4} className={classes.gridItem}>

            <FormControl className={classes.formControl}>
              <InputLabel id="project-studies" className={classes.selectStudies}>Filter By Studies</InputLabel>
              <Select

                labelId="project-studies"
                id="project-studies"
                value={selectedStudy}
                onChange={handleChangeStudies}
                className={classes.selectStudies}
              >
                <MenuItem value="">None</MenuItem>

                {studies && studies.map((st) => (
                  <MenuItem value={st.value}>
                    {st.label}
                    {' '}
                  </MenuItem>
                ))}

              </Select>

            </FormControl>

          </Grid>

          <Grid item xs={4} className={classes.gridItem}>

            <FormControl className={classes.formControl}>
              <InputLabel id="project-modes" className={classes.selectStudies}>Filter By Modes</InputLabel>
              <Select

                labelId="project-modes"
                id="project-modes"
                value={selectedMode}
                onChange={handleChangeModes}
                className={classes.selectStudies}
              >
                <MenuItem value="">None</MenuItem>

                {modes && modes.map((st) => (
                  <MenuItem value={st.value}>
                    {st.label}
                    {' '}
                  </MenuItem>
                ))}

              </Select>

            </FormControl>

          </Grid>
          <Grid item xs={8} className={classes.gridItem}>

            <div className={classes.projects}>
              {projects.length > 0 ? (projects.map((pro) => (
                <ProjectInfo project={pro} />

              ))) : (
                <div>
                  <Alert
                    severity="warning"
                    className={classes.alert}
                  >
                    {errorMsg}
                  </Alert>
                </div>
              )}

            </div>
            {projects.length > 0 ? (
              <Pagination
                className={classes.paging}
                color="primary"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                onChange={handlePageChange}
              />
            ) : (<span />)}

          </Grid>

        </Grid>

      </Grid>

    </div>
  );
};
export default MyProject;
