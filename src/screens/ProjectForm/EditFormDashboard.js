import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Paper, Typography, AppBar, Tabs, Tab, Snackbar, Popover,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import FSelect from 'material-ui-formik-components/Select/Select';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from 'screens/shared/components/ConfirmDialog';
import ProjectPromoter from 'screens/ProjectPromoters/promoter';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import ProjectInfoForm from './projectInfoForm';
import ProjectBar from '../shared/components/ProjectBar';
import ProjectSupervisorsForm from './ProjectSupervisorsForm';
import ProjectMembersForm from './ProjectMembersForm';
import ProjectMembersInput from './ProjectMemberInput';

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
}));

const EditProjectFormDashboard = () => {
  const { IdProject } = useParams();
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

  const [deleteProjectMemberDialogOptions, setDeleteProjectMemberDialogOptions] = useState({
    title: 'Remove Project Member',
    mainText: 'Are you sure you want to remove this project member?',
    id: null,
    open: false,
  });

  const [deleteProjectSupervisorDialogOptions, setDeleteProjectSupervisorDialogOptions] = useState({
    title: 'Remove Project Supervisor',
    mainText: 'Are you sure you want to remove this project supervisor?',
    id: null,
    open: false,
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
  const [isDisableProjectSupervisor, setDisableProjectSupervisor] = useState(true);
  const [successText, setSuccessText] = useState('');
  const [isProjectMemberSuccess, setIsProjectMembersCreated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoad, setLoad] = useState(false);
  const [superviserToRemove, setSupervisorToRemove] = useState([]);
  const [superviserToSubmit, setSupervisorToSubmit] = useState([]);
  const [projectMembersError, setProjectMemberErrorEdit] = useState('');
  const [existingProjectMember, setExistingProjectMember] = useState([]);
  const [pendingProjectMember, setPendingProjectMemberInvitation] = useState([]);
  const [pendingProjectPromotor, setPendingProjectPromotorInvitation] = useState([]);
  const [documentId, setDocumentId] = useState('');

  const setEditProjectSupervisors = async (data) => {
    const projectPromoter = {
      superviser2Email: data[0],
      superviser3Email: data[1],
      superviser4Email: data[2],
      superviser5Email: data[3],
    };

    console.log('set edit');
    return projectPromoter;
  };

  const loadData = async () => {
    const response = await Promise.all([Api.getProjectStatus(), Api.getRoleMembers(),
      Api.getProjectDetails(IdProject), Api.getProjectPromoterEmails(IdProject),
      Api.getProjectMembers(IdProject), Api.getProjectMemberInvitation(IdProject),
      Api.getProjectPromotorInvitation(IdProject),
      Api.getProjectStudies(), Api.getProjectModes()]);

    setStatusOptions(response[0].data.data);
    setRoleOptions(response[1].data.data);
    setInitialProjectInfoValue(response[2].data.data);
    setInitialProjectSupervisors(await setEditProjectSupervisors(response[3].data.data));
    setExistingProjectMember(response[4].data.data);
    setPendingProjectMemberInvitation(response[5].data.data);
    setPendingProjectPromotorInvitation(await setEditProjectSupervisors(response[6].data.data));
    setStudiesList(response[7].data.data);
    setModeList(response[8].data.data);

    setLoad(true);
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

  const removeSupervisor = async (e) => {
    const idName = `superviser-${e.currentTarget.id}`;
    const toRemove = document.getElementById(idName).value;
    setDocumentId(idName);

    setDeleteProjectSupervisorDialogOptions({
      ...deleteProjectSupervisorDialogOptions,
      open: true,
      id: toRemove,

    });
  };

  const handleProjectInfoSubmit = async (e) => {
    setProjectInfoError('');

    const postProject = await Api.editProjectInfo(e)
      .then((response) => {
        setSuccessText('Project is successfully edited!!');
        setOpen(true);
        setInitialProjectInfoValue(e);
      })
      .catch((err) => {
        setProjectInfoError(err.response.data);
      });
  };

  const handleProjectSupervisorsSubmit = async (e) => {
    setProjectSupervisorError('');
    const newSupervisors = [e.superviser2Email, e.superviser3Email, e.superviser4Email, e.superviser5Email];

    newSupervisors.forEach((element) => {
      if (typeof element !== 'undefined') {
        superviserToSubmit.push(element);
      }
    });

    const editSupervisorsData = {
      IdProject,
      SupervisorEmails: superviserToSubmit,
    };
    await Api.postNewSupervisors(editSupervisorsData)
      .then((response) => {
        setSuccessText('Invitation Project Supervisors are sent!');
        setOpen(true);

        setTimeout(() => {
          setOpen(false);
        }, 1000);
      })
      .catch((err) => {
        setProjectSupervisorError(err.response.data);
      });

    const projectPromotorInvitation = await Api.getProjectPromotorInvitation(IdProject);
    setPendingProjectPromotorInvitation(await setEditProjectSupervisors(projectPromotorInvitation.data.data));
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

  const handleProjectMembersSubmit = async (e) => {
    setProjectMemberError('');
    setProjectMembers([]);
    convertIntoArrayMember(e);

    const projectMemberReq = {
      IdProject,
      NewMembers: newProjectMembers,
    };

    const projectMembersToPost = await Api.postNewMembers(projectMemberReq)
      .then((response) => {
        setSuccessText('Invitation Project Members are sent!');
        setProjectMembers([]);
        setAnchorEl(null);
        setOpen(true);
      })
      .catch((err) => {
        setProjectMemberError(err.response.data);
      });

    const refreshedPendingInvitation = await Api.getProjectMemberInvitation(IdProject);
    setPendingProjectMemberInvitation(refreshedPendingInvitation.data.data);
  };

  const onRemoveProjectMember = async (idProjectMember) => {
    setDeleteProjectMemberDialogOptions({
      ...deleteProjectMemberDialogOptions,
      open: true,
      id: idProjectMember,
    });
  };

  const changeProjectMemberRole = async (e) => {
    const updateProjectMemberWrapper = {
      IdProjectMember: e.idProjectMemberField,
      IdNewRole: e.roledropdown,
    };

    await Api.updateProjectMember(updateProjectMemberWrapper)
      .then((response) => {
        setSuccessText('Member role has been updated!');
        setAnchorEl(null);
        setOpen(true);
      }).catch((err) => {
        setProjectMemberErrorEdit(err.response.data);
      });
  };

  const onProjectMemberDeleteDialogClosed = async (confirmed, idProjectMember) => {
    if (confirmed) {
      await Api.deleteProjectMember(idProjectMember);
      const refreshedProjectMembers = await Api.getProjectMembers(IdProject);

      setExistingProjectMember([]);
      setExistingProjectMember(refreshedProjectMembers.data.data);
      setDeleteProjectMemberDialogOptions({
        ...deleteProjectMemberDialogOptions,
        open: false,
      });
    } else {
      setDeleteProjectMemberDialogOptions({
        ...deleteProjectMemberDialogOptions,
        open: false,
      });
    }
  };

  const onProjectPromotorDeleteDialogClosed = async (confirmed, emailUser) => {
    if (confirmed) {
      await Api.deleteProjectPromotor(IdProject, emailUser);
      switch (documentId) {
        case 'superviser-2':
          initialProjectSupervisors.superviser2Email = '';
          break;
        case 'superviser-3':
          initialProjectSupervisors.superviser3Email = '';
          break;
        case 'superviser-4':
          initialProjectSupervisors.superviser4Email = '';
          break;
        case 'superviser-5':
          initialProjectSupervisors.superviser5Email = '';
          break;
        default:
          console.log('unexpected case');
      }

      setDeleteProjectSupervisorDialogOptions({
        ...deleteProjectSupervisorDialogOptions,
        open: false,
      });
    } else {
      setDeleteProjectSupervisorDialogOptions({
        ...deleteProjectSupervisorDialogOptions,
        open: false,
      });
    }
  };
  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <ConfirmDialog {...deleteProjectSupervisorDialogOptions} onDialogClosed={onProjectPromotorDeleteDialogClosed} />

        <ConfirmDialog {...deleteProjectMemberDialogOptions} onDialogClosed={onProjectMemberDeleteDialogClosed} />
        <Grid item xs={2}>
          <ProjectBar className={classes.projectBar} />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>Edit Project Form</Typography>
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
                <Tab label="Project Milestones" />

              </Tabs>

            </AppBar>

            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                {newProjectInfoError && <Alert severity="error">{newProjectInfoError}</Alert>}
                {isLoad && (
                <ProjectInfoForm
                  onSubmit={handleProjectInfoSubmit}
                  statusOptions={statusList}
                  studiesOptions={studiesList}
                  modeOptions={modeList}
                  initialValues={initialProjectInfoValue}
                  isReadOnly={false}
                  isEdit
                />
                )}

              </TabPanel>

              <TabPanel value={value} index={1} dir={theme.direction}>

                {newProjectSupervisorError && <Alert severity="error">{newProjectSupervisorError}</Alert>}

                {isLoad && <ProjectSupervisorsForm onSubmit={handleProjectSupervisorsSubmit} initialValues={initialProjectSupervisors} isEdit closeIconAction={removeSupervisor} /> }
                <div>
                  <span>Pending Project Promotor Invitation</span>
                  {isLoad && <ProjectSupervisorsForm initialValues={pendingProjectPromotor} isReadOnly /> }

                </div>

              </TabPanel>

              <TabPanel value={value} index={2} dir={theme.direction}>

                <Button className={classes.buttonAddMember} aria-describedby={id} variant="contained" color="primary" onClick={handleClickAddMember}>
                  Add Project Members
                </Button>

                <div>
                  {projectMembersError && <Alert severity="error">{projectMembersError}</Alert>}
                  { isLoad && existingProjectMember.length > 0 ? (
                    existingProjectMember.map((member) => (

                      <ProjectMembersInput
                        idProjectMember={member.idProjectMember}
                        member
                        name={`${member.firstName} ${member.lastName}`}
                        role={member.projectRole}
                        isEdit
                        removeAction={() => onRemoveProjectMember(member.idProjectMember)}
                        roleOption={roleList}
                        roleDefaultValue={member.role}
                        changeSubmit={changeProjectMemberRole}
                      />

                    ))) : (<span />) }
                </div>
                <div>
                  {pendingProjectMember.length > 0 && (<span>Pending Project Member Invitation</span>)}
                  { isLoad && pendingProjectMember.length > 0 ? (
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

            </SwipeableViews>

          </StyledSection>
        </Grid>

      </Grid>
    </div>

  );
};

export default EditProjectFormDashboard;
