import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import TimelineIcon from '@material-ui/icons/Timeline';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HistoryIcon from '@material-ui/icons/History';
import { makeStyles } from '@material-ui/core/styles';

const StyledWrapper = styled.div`
  width: 13rem;
  height: 37rem;
  border-radius: 5px;
  background-color: #1d1d1d;
`;

const StyledTitle = styled.h2`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  color: #adadad;
  font-family: 'Roboto', sans-serif;
  padding: 5px 10px;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  margin-left: 10px;
]  text-align: center;
  color: #adadad;
`;
const useStyles = makeStyles({
  dividerStyle: {
    backgroundColor: '#DCDCDC',
    opacity: '0.4',

  },
  buttonStyle: {
    height: '3rem',
    padding: '0.1rem',
    textTransform: 'none',

  },
  divItem: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: '10px',

  },
  IconStyle: {
    color: '#DCDCDC',
    opacity: '0.5',
    background: '#484a48',
    padding: '5px',
    borderRadius: '50%',
  },

});

const ProjectBar = () => {
  const { IdProject } = useParams();
  const classes = useStyles();
  return (
    <StyledWrapper>
      <Grid container direction="row">
        <Grid item xs={6}>
          <StyledTitle>
            Project
          </StyledTitle>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.dividerStyle} />
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <HomeOutlinedIcon className={classes.IconStyle} />
              <StyledP>Homepage</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <DashboardIcon className={classes.IconStyle} />
              <StyledP>Dashboard</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-detail/${IdProject}`}>
            <div className={classes.divItem}>
              <InfoOutlinedIcon className={classes.IconStyle} />
              <StyledP>Info</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <PersonOutlineOutlinedIcon className={classes.IconStyle} />
              <StyledP>Supervisors</StyledP>

            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-members/${IdProject}`}>
            <div className={classes.divItem}>
              <GroupOutlinedIcon className={classes.IconStyle} />
              <StyledP>Members</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <TimelineIcon className={classes.IconStyle} />
              <StyledP>Timeline</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <TimelapseOutlinedIcon className={classes.IconStyle} />
              <StyledP>Milestone</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <CalendarTodayOutlinedIcon className={classes.IconStyle} />
              <StyledP>Calendar</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <NoteOutlinedIcon className={classes.IconStyle} />
              <StyledP>Note</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <FormatListBulletedIcon className={classes.IconStyle} />
              <StyledP>Tasks</StyledP>
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button size="small" className={classes.buttonStyle} href={`/project-promoters/${IdProject}`}>
            <div className={classes.divItem}>
              <HistoryIcon className={classes.IconStyle} />
              <StyledP>History</StyledP>
            </div>
          </Button>
        </Grid>

      </Grid>
    </StyledWrapper>
  );
};

export default ProjectBar;
