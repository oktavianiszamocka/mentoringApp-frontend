import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Paper, Avatar, Typography, AppBar, Tabs, Tab, Snackbar, Popover,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import S3FileUpload from 'react-s3';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectInfoForm from './projectInfoForm';
import ProjectBar from '../shared/components/ProjectBar';
import ProjectSupervisorsForm from './ProjectSupervisorsForm';
import ProjectMembersForm from './ProjectMembersForm';
import ProjectMembersInput from './ProjectMemberInput';
import ProjectUrlsForm from './ProjectUrl';
import S3config from '../../globals/S3Config';

const StyledSection = styled.section`
  margin: 1rem;
  padding : 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);

`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  projectBar: {
    marginTop: '2rem',
  },
  errorMessage: {
    display: 'block',
    color: 'red',
    textAlign: 'center',
  },
  buttonAddMember: {
    margin: 'auto',
  },
  popOverDiv: {
    width: '50rem',
    height: 'auto',
  },
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '150px',
    height: '150px',
    marginTop: '1rem',
  },
}));

const ProjectFormBoard = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [initialProjectInfoValue, setInitialProjectInfoValue] = useState({
    name: '',
    description: '',
    status: '',
    startDate: new Date(),
    superviserEmail: '',
    endDate: '',

  });
  const [initialProjectSupervisors, setInitialProjectSupervisors] = useState({
    superviser2Email: '',
    superviser3Email: '',
    superviser4Email: '',
    superviser5Email: '',

  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [statusList, setStatusOptions] = useState([]);
  const [roleList, setRoleOptions] = useState([]);
  const [studiesList, setStudiesList] = useState([]);
  const [modeList, setModeList] = useState([]);
  const [newProjectInfoError, setProjectInfoError] = useState('');
  const [newProjectSupervisorError, setProjectSupervisorError] = useState('');
  const [newProjectMemberError, setProjectMemberError] = useState('');
  const [newProjectMembers, setProjectMembers] = useState([]);
  const [newProjectId, setNewProjectId] = useState('');
  const [isNewProjectCreated, setIscreated] = useState(false);
  const [isDisableProjectSupervisor, setDisableProjectSupervisor] = useState(true);
  const [successText, setSuccessText] = useState('');
  const [isProjectMemberSuccess, setIsProjectMembersCreated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShowMemberList, setShowMemberList] = useState(false);
  const [pendingProjectMember, setPendingProjectMemberInvitation] = useState([]);
  const [uploadUrl, setUploadUrl] = useState('');
  const [iconError, setIconError] = useState('');
  const [urlTypeOption, setUrlTypeOption] = useState([]);
  const [urlErrorMessage, setUrlErrorMessage] = useState('');
  const [projectLinks, setProjectLinks] = useState([]);

  const loadData = async () => {
    const response = await Promise.all([Api.getProjectStatus(), Api.getRoleMembers(),
      Api.getProjectStudies(), Api.getProjectModes(), Api.getProjectUrlTypes()]);
    setStatusOptions(response[0].data.data);
    setRoleOptions(response[1].data.data);
    setStudiesList(response[2].data.data);
    setModeList(response[3].data.data);
    setUrlTypeOption(response[4].data.data);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClickAddMember = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? 'simple-popover' : undefined;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(async () => {
    loadData();
  }, []);

  const handleProjectInfoSubmit = async (e) => {
    setProjectInfoError('');

    const postProject = await Api.postNewProject(e)
      .then((response) => {
        setNewProjectId(response.data.idProject);
        setSuccessText('Project is successfuly created!!');
        setOpen(true);
        setIscreated(true);
        setDisableProjectSupervisor(false);
        setInitialProjectInfoValue(e);
        setTimeout(() => {
          setValue(1);
          setOpen(false);
        }, 1000);
      })
      .catch((err) => {
        setProjectInfoError(err.response.data);
      });
  };

  const handleProjectSupervisorsSubmit = async (e) => {
    setProjectSupervisorError('');
    const newSupervisors = [e.superviser2Email, e.superviser3Email, e.superviser4Email, e.superviser5Email];

    const postNewSupervisorsData = {
      IdProject: newProjectId,
      SupervisorEmails: newSupervisors,
    };

    await Api.postNewSupervisors(postNewSupervisorsData)
      .then((response) => {
        setSuccessText('Invitation Project Supervisors are sent!');
        setOpen(true);
        setInitialProjectSupervisors(e);
        setDisableProjectSupervisor(true);
        setTimeout(() => {
          setValue(2);
          setOpen(false);
        }, 1000);
      })
      .catch((err) => {
        setProjectSupervisorError(err.response.data);
      });
  };
  const convertIntoArrayMember = async (e) => {
    if (e.projectMember1 !== '') {
      const member1 = {
        memberEmail: e.projectMember1,
        role: e.Role1,
        roleLabel: roleList[e.Role1 - 1].label,
      };
      newProjectMembers.push(member1);
    }
    if (e.projectMember2 !== '') {
      const member2 = {
        memberEmail: e.projectMember2,
        role: e.Role2,
        roleLabel: roleList[e.Role2 - 1].label,
      };
      newProjectMembers.push(member2);
    }

    if (e.projectMember3 !== '') {
      const member3 = {
        memberEmail: e.projectMember3,
        role: e.Role3,
        roleLabel: roleList[e.Role3 - 1].label,
      };
      newProjectMembers.push(member3);
    }

    if (e.projectMember4 !== '') {
      const member4 = {
        memberEmail: e.projectMember4,
        role: e.Role4,
        roleLabel: roleList[e.Role4 - 1].label,
      };
      newProjectMembers.push(member4);
    }

    if (e.projectMember5 !== '') {
      const member5 = {
        memberEmail: e.projectMember5,
        role: e.Role5,
        roleLabel: roleList[e.Role5 - 1].label,
      };
      newProjectMembers.push(member5);
    }
  };

  const changeToBeProjectLead = async () => {
    newProjectMembers[0].role = 1;
    newProjectMembers[0].roleLabel = roleList[0].label;
  };

  const handleProjectMembersSubmit = async (e) => {
    setProjectMemberError('');
    setProjectMembers([]);
    convertIntoArrayMember(e);

    const projectMemberReq = {
      IdProject: newProjectId,
      NewMembers: newProjectMembers,
    };

    const projectMembersToPost = await Api.postNewMembers(projectMemberReq)
      .then((response) => {
        setSuccessText('Invitation Project Members are sent!');
        // setProjectMembers(newProjectMembers);
        if (newProjectMembers.length === 1) {
          changeToBeProjectLead();
        }

        setShowMemberList(true);
        setAnchorEl(null);
        setOpen(true);
      })
      .catch((err) => {
        setProjectMemberError(err.response.data);
      });

    setPendingProjectMemberInvitation([]);
    const refreshedPendingInvitation = await Api.getProjectMemberInvitation(newProjectId);

    setPendingProjectMemberInvitation(refreshedPendingInvitation.data.data);
  };

  const uploadToBackend = async (s3url) => {
    const uploadBackend = Api.postProjectIconUrl(newProjectId, s3url)
      .then((response) => {
        setSuccessText('Project Icon has been successfully uploaded');
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 5000);
      })
      .catch((err) => {
        setIconError(err.response.data);
      });
  };

  const uploadIcon = async (e) => {
    setUploadUrl('');
    setIconError('');
    await S3FileUpload.uploadFile(e.target.files[0], S3config.config)
      .then((data) => {
        setUploadUrl(data.location);
        uploadToBackend(data.location);
      })
      .catch((err) => {
        setIconError(err.response.data);
      });
  };

  const convertToProjectUrlArr = (data) => {
    if (data.url1 !== '') {
      projectLinks.push({
        link: data.url1,
        project: newProjectId,
        type: data.url1_type,
      });
    }
    if (data.url2 !== '') {
      projectLinks.push({
        link: data.url2,
        project: newProjectId,
        type: data.url2_type,
      });
    }
  };
  const postProjectUrl = async (e) => {
    console.log(e);
    convertToProjectUrlArr(e);
    setUrlErrorMessage('');
    await Api.postProjectUrls(projectLinks)
      .then((data) => {
        setSuccessText('Project Urls has been saved!');
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 5000);
      })
      .catch((err) => {
        setUrlErrorMessage(err.response.data);
      });
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <ProjectBar className={classes.projectBar} />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>Project Form</Typography>
          <StyledSection>
            <Snackbar
              anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
              open={open}
              autoHideDuration={1000}
              onClose={handleCloseSnackBar}
            >
              <Alert onClose={handleCloseSnackBar} severity="success">
                {successText}
              </Alert>
            </Snackbar>
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
                <Tab label="Project Icon" />
                <Tab label="Project Urls" />
              </Tabs>

            </AppBar>

            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                {newProjectInfoError && <Alert severity="error">{newProjectInfoError}</Alert>}
                <ProjectInfoForm
                  onSubmit={handleProjectInfoSubmit}
                  statusOptions={statusList}
                  studiesOptions={studiesList}
                  modeOptions={modeList}
                  initialValues={initialProjectInfoValue}
                  isReadOnly={isNewProjectCreated}
                />

              </TabPanel>

              <TabPanel value={value} index={1} dir={theme.direction}>
                {!isNewProjectCreated ? <span>Please fill Project Info section first</span> : <span />}

                {newProjectSupervisorError && <Alert severity="error">{newProjectSupervisorError}</Alert>}

                <ProjectSupervisorsForm onSubmit={handleProjectSupervisorsSubmit} initialValues={initialProjectSupervisors} isReadOnly={isDisableProjectSupervisor} />

              </TabPanel>

              <TabPanel value={value} index={2} dir={theme.direction}>
                {!isNewProjectCreated ? (
                  <div>
                    <span>Please fill Project Info section first</span>

                    <br />
                    <br />

                  </div>
                ) : <span /> }

                <Button className={classes.buttonAddMember} aria-describedby={id} variant="contained" color="primary" onClick={handleClickAddMember} disabled={!isNewProjectCreated}>
                  Add Project Members
                </Button>

                <div>
                  { isShowMemberList ? (
                    pendingProjectMember.map((invitation) => (

                      <ProjectMembersInput
                        name={invitation.nameUser}
                        role={invitation.roleName}
                      />

                    ))) : (<span />) }
                </div>

                <Popover
                  open={openPopOver}
                  anchorReference="none"
                  classes={{
                    root: classes.popoverRoot,
                  }}
                  onClose={handleClose}

                >
                  <div className={classes.popOverDiv}>
                    {newProjectMemberError && <Alert severity="error">{newProjectMemberError}</Alert>}
                    <ProjectMembersForm onSubmit={handleProjectMembersSubmit} roleOption={roleList} />
                  </div>
                </Popover>

              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                {!isNewProjectCreated ? <span>Please fill Project Info section first</span> : <span />}

                {iconError && <Alert severity="error">{iconError}</Alert>}

                {isNewProjectCreated ? (
                  <div>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={uploadIcon}
                    />
                    {uploadUrl && (
                    <Avatar
                      src={uploadUrl}
                      className={classes.avatar}
                    />
                    ) }

                  </div>

                ) : <span />}

              </TabPanel>

              <TabPanel value={value} index={4} dir={theme.direction}>
                {!isNewProjectCreated ? <span>Please fill Project Info section first</span> : <span />}

                {urlErrorMessage && <Alert severity="error">{urlErrorMessage}</Alert>}

                {isNewProjectCreated ? (
                  <ProjectUrlsForm
                    urlTypeOption={urlTypeOption}
                    onSubmit={postProjectUrl}
                  />

                ) : <span />}

              </TabPanel>
            </SwipeableViews>

          </StyledSection>
        </Grid>

      </Grid>
    </div>

  );
};

export default ProjectFormBoard;
