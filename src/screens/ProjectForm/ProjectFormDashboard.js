import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Paper, Typography, AppBar, Tabs, Tab,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectInfoForm from './projectInfoForm';

const StyledSection = styled.section`
  margin: 1rem;
  padding : 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;
function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  membersDiv: {
    marginLeft: '1rem',
    flexGrow: '1',
    padding: theme.spacing(1),

  },

  paperLeft: {
    height: '35rem',
    width: '15rem',

  },
  tabPanel: {
    padding: '1rem',
  },

}));

const ProjectFormBoard = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [projectInfoInitialValues, setProjectInfoInitialValue] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
            <Typography variant="h4" gutterBottom>Project Form</Typography>

            <StyledSection>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Project Info" />

                  <Tab label="Project Supervisors" />
                  <Tab label="Project Members" />
                  <Tab label="Project Milestones" />
                </Tabs>

              </AppBar>

              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>

                  <ProjectInfoForm onSubmit={handleProjectInfoSubmit} />

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  Item Three
                </TabPanel>
              </SwipeableViews>

            </StyledSection>

          </Grid>

        </div>

      </Grid>
    </div>

  );
};

export default ProjectFormBoard;
