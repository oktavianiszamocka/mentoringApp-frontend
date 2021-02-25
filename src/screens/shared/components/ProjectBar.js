import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
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

const StyledWrapper = styled.div`
  width: 200px;
  height: 560px;
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

const ProjectBar = () => (
  <StyledWrapper>
    <Grid container direction="row">
      <Grid item xs={6}>
        <StyledTitle>
          Project
        </StyledTitle>
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ backgroundColor: '#DCDCDC', opacity: '0.4' }} />
      </Grid>
      <Grid item xs={12}>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <HomeOutlinedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Homepage</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <DashboardIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Dashboard</StyledP>
        </div>
      </Grid>
      {' '}
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <InfoOutlinedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Info</StyledP>
        </div>
      </Grid>
      {' '}
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <PersonOutlineOutlinedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Supervisors</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <GroupOutlinedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Members</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <TimelineIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Timeline</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <TimelapseOutlinedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Milestone</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <CalendarTodayOutlinedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Calendar</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <NoteOutlinedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Note</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <FormatListBulletedIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>Tasks</StyledP>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '10px',
        }}
        >
          <HistoryIcon style={{
            color: '#DCDCDC', opacity: '0.5', background: '#484a48', padding: '5px', borderRadius: '50%',
          }}
          />
          <StyledP>History</StyledP>
        </div>
      </Grid>

    </Grid>
  </StyledWrapper>

);

export default ProjectBar;
