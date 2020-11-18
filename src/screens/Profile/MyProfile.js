import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MaterialAvatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Title from '../shared/components/Title';
import font from '../../globals/postFont';
import moment from 'moment';

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

const MyProfile = ({user, profileInfo}) =>{
 var dateOfBirthFormat = moment(profileInfo.dateOfBirth).format('LL');

  return(
    <div>
    <StyledSection>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <MaterialAvatar
            src={user.imageUrl}
            style={{
              width: '100px', height: '100px', boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)', borderRadius: '1.5rem',
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <h1 style={{
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
            marginTop: '5px', marginLeft: '20px', height: '20px', width: '10px',
          }}
        >
          Edit
        </Button>
      </Grid>
      <StyledInfoSection>
        <Grid
          container
          justify="center"
        >
          <Grid item xs={11}>
            <Title text="Personal Information" textAlign="center" fontSize="10px" fontColor="black" />
          </Grid>
          <EditIcon />
        </Grid>
        <p>Name : {user.firstName}</p>
        <p>Surname : {user.lastName}</p>
        <p>E-mail : </p>
        <p>Phone : {profileInfo.phone}</p>
        <p>Date of Birth : {dateOfBirthFormat} </p>
        <p>Nationality : {profileInfo.country}</p>
        <Divider />
        <p>Major : {profileInfo.major} </p>
        <p>Semester : {profileInfo.semester}</p>
      

      </StyledInfoSection>
      <StyledInfoSection>
        <Grid
          container
          justify="center"
        >
          <Grid item xs={11}>
            <Title text="Technical" textAlign="center" fontSize="10px" fontColor="black" />
          </Grid>
          <EditIcon />
        </Grid>
        <p>Skill : {profileInfo.skills}</p>
        <p>Experience : {profileInfo.experiences} </p>
      </StyledInfoSection>
    </StyledSection>
  </div>

  )

} 
  
  

export default MyProfile;
