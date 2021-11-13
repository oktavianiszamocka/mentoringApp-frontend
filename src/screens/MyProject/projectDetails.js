import React from 'react';
import { Button, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import moment from 'moment';
import AllNotes from '../shared/components/AllNotes';
import Header from '../shared/components/Header';

const StyledSection = styled.section`
  margin: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  width: '50rem';
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledInfoSection = styled.section`
  margin: 2rem;
  padding: 1rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const projectDetails = ({ projectInfo }) => {
  const dateOfStartDate = moment(projectInfo.startDate).format('LL');
  const dateOfEndDate = (projectInfo.endDate != null) ? moment(projectInfo.startDate).format('LL') : '-';

  return (
    <div>
      <StyledSection>

        <Grid container spacing={1}>
          <Grid item xs={2}>
            {projectInfo.icon
            && (
            <Avatar
              src={projectInfo.icon}
              style={{
                width: '150px',
                height: '150px',
              }}
            />
            )}
          </Grid>
          <Grid container item xs={8} justify="center">
            <h1
              style={{
                fontFamily: 'sans-serif',
                fontWeight: 100,
                letterSpacing: '0.3rem',
                textTransform: 'uppercase',
                fontSize: '35px',
                marginTop: '50px',
              }}
            >
              {`${projectInfo.name} `}
            </h1>
          </Grid>

        </Grid>
        <StyledInfoSection>
          <Grid container justify="center">
            <h1>
              {`${projectInfo.description} `}
            </h1>

          </Grid>

          <Divider />
          <p>
            Start Date :
            {' '}
            {`${dateOfStartDate} `}

          </p>
          <p>
            Approximate End Date :
            {`${dateOfEndDate} `}

          </p>
          <p>
            Status :
            {' '}
            {`${projectInfo.statusName} `}
          </p>
          <p>
            Mentor :
            {' '}
            {`${projectInfo.superviserFirstName} ${projectInfo.superviserLastName}`}

          </p>
          <p>
            Project Leader :
            {' '}
            {`${projectInfo.projectLeaderFirstName} ${projectInfo.projectLeaderLastName}`}

          </p>
          <p>
            Study :
            {' '}

            {`${projectInfo.studiesName} `}

          </p>
          <p>
            Mode :
            {' '}
            {`${projectInfo.modeName} `}

          </p>

          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: '5px',
              height: '20px',
              width: '10px',
            }}
          >
            Edit
          </Button>

        </StyledInfoSection>
        <Grid container justify="center">
          <GitHubIcon
            style={{

              height: '50px',
              width: '50px',
            }}
            onClick={(event) => window.open(projectInfo.urlLinks[1])}
          />
        </Grid>

      </StyledSection>
    </div>

  );
};

export default projectDetails;
