import React from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import MaterialAvatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import Title from '../shared/components/Title';
import EditForm from './EditForm';

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

const StyledLabels = styled.p`
font-family: sans-serif;
text-transform: uppercase;
color: rgba(0,0,0,0.5);
letter-spacing: 0.2rem;
font-size: 1em;
margin-left: 10px;

`;

const StyledData = styled.p`
font-family: sans-serif;
color: rgba(0,0,0);
font-size: 1em;
margin-left: 10px;
`;

const MyProfile = ({ user, profileInfo }) => {
  const dateOfBirthFormat = moment(profileInfo.dateOfBirth).format('LL');
  const allSkills = profileInfo.skills.split(',');

  return (
    <div>
      <StyledSection>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <MaterialAvatar
              src={user.imageUrl}
              style={{
                width: '100px',
                height: '100px',
                boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)',
                borderRadius: '1.5rem',
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <h1
              style={{
                fontFamily: 'sans-serif',
                fontWeight: 100,
                letterSpacing: '0.3rem',
                textTransform: 'uppercase',
                fontSize: '35px',
              }}
            >
              {`${user.firstName} ${user.lastName}`}
            </h1>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            style={{
              marginTop: '5px',
              marginLeft: '20px',
              height: '20px',
              width: '10px',
            }}
          >
            Edit
          </Button>
        </Grid>
        <StyledInfoSection>
          <Grid container>
            <Grid item xs={11}>
              <Title
                text="Personal Information"
                textAlign="center"
                fontSize="10px"
                fontColor="black"
              />
            </Grid>

            {' '}
            <Grid item xs={1}>
              <StyledLabels>
                Name:
              </StyledLabels>
            </Grid>
            <Grid item xs={11}>
              <StyledData>
                {user.firstName}
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Surname:
              </StyledLabels>
            </Grid>
            <Grid item xs={10}>
              <StyledData>
                {user.lastName}
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                E-mail:
              </StyledLabels>
            </Grid>
            <Grid item xs={10}>
              <StyledData>
                taylor.swift@gmail.com
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Phone number:
              </StyledLabels>
            </Grid>
            <Grid item xs={9}>
              <StyledData>
                {profileInfo.phone}
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Date of birth:
              </StyledLabels>
            </Grid>
            <Grid item xs={9}>
              <StyledData>
                {dateOfBirthFormat}
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Country:
              </StyledLabels>
            </Grid>
            <Grid item xs={10}>
              <StyledData>
                {profileInfo.country}
              </StyledData>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Major:
              </StyledLabels>
            </Grid>
            <Grid item xs={10}>
              <StyledData>
                {profileInfo.major}
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Semester:
              </StyledLabels>
            </Grid>
            <Grid item xs={9}>
              <StyledData>
                {profileInfo.semester}
              </StyledData>
            </Grid>

          </Grid>

        </StyledInfoSection>
        <StyledInfoSection>
          <Grid container>
            <Grid item xs={11}>
              <Title text="Technical" textAlign="center" fontSize="10px" fontColor="black" />
            </Grid>

            <Grid item xs={12}>
              <StyledLabels>
                Skills:
              </StyledLabels>
            </Grid>
            <Grid item xs={12}>
              <div>
                {allSkills.map((tag) => (
                  <Chip label={tag} color="primary" style={{ margin: '0 5px' }} />
                ))}
              </div>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Experiance:
              </StyledLabels>
            </Grid>
            <Grid item xs={9}>
              <StyledData>
                {profileInfo.experiences}
              </StyledData>
            </Grid>

          </Grid>
        </StyledInfoSection>
      </StyledSection>
    </div>
  );
};

export default MyProfile;
