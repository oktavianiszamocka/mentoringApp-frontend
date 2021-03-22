import React from 'react';
import styled from 'styled-components';
import { Button, Grid, IconButton } from '@material-ui/core';
import MaterialAvatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../shared/components/Title';

const StyledSection = styled.section`
  margin: 2rem;
  padding: 2rem;
  background-color: #f5f5f5;
  width: '50rem';
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledInfoSection = styled.section`
  margin: 2rem;
  padding: 2rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledLabels = styled.p`
font-family: 'Roboto', sans-serif;
text-transform: uppercase;
color: rgba(0,0,0,0.5);
letter-spacing: 0.2rem;
font-size: 1em;
margin: 0px;
padding: 1px;
`;

const StyledUnderData = styled.p`
  font-family: 'Roboto', arial;
  font-size: 1rem;
  margin: 0px;
  padding: 1px;
  color: rgba(1,1,1,0.5);
`;

const StyledData = styled.p`
  font-family: 'Roboto', arial;
  font-size: 1rem;
  margin: 0px;
  padding: 1px;
  color: #4c4d4d;
`;

const StyledTitle = styled.p`
  font-family: 'Roboto', arial;
  font-weight: 100;
  font-size: 25px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 10px;
  color: #4c4d4d;
  text-align : center;
`;

const StyledTitleName = styled.p`
  font-family: 'Roboto', arial;
  font-weight: 100;
  font-size: 25px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #4c4d4d;
  margin: 0;

`;
const useStyles = makeStyles({
  avatar: {
    width: '120px',
    height: '120px',
    boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)',
    borderRadius: '1.5rem',
  },
  buttonEdit: {
    marginLeft: '2rem',
  },
  chipStyle: {
    margin: '0 5px',
  },

});
const MyProfile = ({ profileInfo, showEditButton }) => {
  const dateOfBirthFormat = moment(profileInfo.dateOfBirth).format('LL');
  const allSkills = profileInfo.skills.split(',');
  const classes = useStyles();

  return (
    <div>
      <StyledSection>
        <Grid
          container
          spacing={3}
          alignItems="center"
        >
          <Grid item style={{ marginLeft: '2rem' }}>
            <MaterialAvatar
              src={profileInfo.avatar}
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={8}>
            <div>
              <StyledTitleName>
                {`${profileInfo.firstName} ${profileInfo.lastName}`}
              </StyledTitleName>
              <StyledUnderData>{`${profileInfo.major}`}</StyledUnderData>
              <StyledUnderData>{`Semester ${profileInfo.semester}`}</StyledUnderData>
            </div>
          </Grid>
          <Grid item>
            {showEditButton && (

              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonEdit}
                href={`/edit-profile/${profileInfo.user}`}
              >
                Edit data
              </Button>

            ) }
          </Grid>
        </Grid>

        <StyledInfoSection>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTitle>Personal Information</StyledTitle>
            </Grid>

            {' '}
            <Grid item xs={1}>
              <StyledLabels>
                Name:
              </StyledLabels>
            </Grid>
            <Grid item xs={11}>
              <StyledData>
                {profileInfo.firstName}
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                Surname:
              </StyledLabels>
            </Grid>
            <Grid item xs={10}>
              <StyledData>
                {profileInfo.lastName}
              </StyledData>
            </Grid>
            <Grid item xs={1.5}>
              <StyledLabels>
                E-mail:
              </StyledLabels>
            </Grid>
            <Grid item xs={10}>
              <StyledData>
                {profileInfo.email}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTitle>Technical Information</StyledTitle>
            </Grid>
            <Grid item xs={12}>
              <StyledLabels>
                Skills:
              </StyledLabels>
            </Grid>
            <Grid item xs={12}>
              <div>
                {allSkills.map((tag) => (
                  <Chip label={tag} color="primary" className={classes.chipStyle} />
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
