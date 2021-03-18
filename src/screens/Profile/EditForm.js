import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import MaterialAvatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Title from '../shared/components/Title';
import Api from '../../api/index';

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

const EditForm = ({ profileInfo }) => {
  const dateOfBirthFormat = moment(profileInfo.dateOfBirth).format('LL');

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(dateOfBirthFormat);
  const [onUpdateAction, setUpdateAction] = useState(false);
  const [updateProfileInitialValue, setUpdateProfileInitialValue] = useState(profileInfo);
  const [newFirstName, setFirstName] = useState(profileInfo.firstName);
  const [newLastName, setLastName] = useState(profileInfo.lastName);
  const [newPhone, setPhone] = useState(profileInfo.phone);
  const [newCountry, setCountry] = useState(profileInfo.country);
  const [newEmail, setEmail] = useState(profileInfo.email);
  const [newMajor, setMajor] = useState(profileInfo.major);
  const [newSemester, setSemester] = useState(profileInfo.semester);
  const [newSkills, setSkills] = useState(profileInfo.skills);
  const [newExperience, setExperience] = useState(profileInfo.experiences);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onProfileUpdateHandler = async () => {
    const profileData = {
      idUser: profileInfo.user,
      idProfile: profileInfo.idProfile,
      lastName: newLastName,
      firstName: newFirstName,
      email: newEmail,
      phone: newPhone,
      dateOfBirth: selectedDate,
      country: newCountry,
      major: newMajor,
      semester: newSemester,
      skills: newSkills,
      experiences: newExperience,
    };

    await Api.updateProfileData(profileData)
      .then((res) => {
        if (res.status === 200) {
          window.location = `/profile/${profileInfo.user}`;
        }
      });
  };

  return (
    <div>
      <StyledSection>
        <Grid
          container
          spacing={3}
          alignItems="center"
        >
          <Grid item xs={2}>
            <MaterialAvatar
              src={profileInfo.avatar}
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
              {`${profileInfo.firstName} ${profileInfo.lastName}`}
            </h1>
          </Grid>
        </Grid>
        <StyledInfoSection>
          <Grid container justify="center">
            <Grid item xs={11}>
              <Title
                text="Edit Profile"
                textAlign="center"
                fontSize="10px"
                fontColor="black"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name-edit"
                defaultValue={profileInfo.firstName}
                label="First Name"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setFirstName(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="surname-edit"
                defaultValue={profileInfo.lastName}
                label="Surname"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setLastName(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email-edit"
                defaultValue={profileInfo.email}
                label="E-mail"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setEmail(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone-edit"
                defaultValue={profileInfo.phone}
                label="Phone"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setPhone(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of birth"
                  style={{ marginLeft: '4px', width: '20em' }}
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="country-edit"
                defaultValue={profileInfo.country}
                label="Country"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setCountry(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="major-edit"
                defaultValue={profileInfo.major}
                label="Major"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setMajor(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="semester-edit"
                defaultValue={profileInfo.semester}
                label="Semester"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setSemester(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="skill-edit"
                defaultValue={profileInfo.skills}
                label="Skill"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setSkills(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="experience-edit"
                defaultValue={profileInfo.experiences}
                label="Experience"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setExperience(e.target.value); }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
            >
              <Button
                variant="contained"
                justify="center"
                color="secondary"
                onClick={() => onProfileUpdateHandler()}
              >
                Save changes
              </Button>
            </Grid>
          </Grid>
        </StyledInfoSection>
      </StyledSection>
    </div>
  );
};

export default EditForm;
