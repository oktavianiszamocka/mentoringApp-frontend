import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import MaterialAvatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
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

const EditForm = ({ user, profileInfo }) => {
  const dateOfBirthFormat = moment(profileInfo.dateOfBirth).format('LL');

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(dateOfBirthFormat);
  const [onUpdateAction, setUpdateAction] = useState(false);
  const [updateProfileInitialValue, setUpdateProfileInitialValue] = useState(profileInfo);
  const [newFirstName, setFirstName] = useState(user.firstname);
  const [newLastName, setLastName] = useState(user.lastName);
  const [newPhone, setPhone] = useState(profileInfo.phone);
  const [newCountry, setCountry] = useState(profileInfo.country);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onProfileUpdateHandler = async () => {
    const profileData = {
      idUser: user.idUser,
      idProfile: profileInfo.idProfile,
      firstName: newFirstName,
      lastName: newLastName,
      email: 'oktardo@gmail.com',
      phone: '1891', // problem
      dateOfBirth: '1996-01-06T00:00:00',
      country: 'Poland', // problem
      major: 'Computer Science',
      semester: 8,
      skills: 'Computer Science',
      experiences: 'Junior',
    };
    console.log(profileData);

    const newPost = await Api.updateProfileData(profileData)
      .then((response) => console.log(response.data));
    setUpdateAction(true);
    setUpdateProfileInitialValue(profileData);
    console.log();
  };

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
        <StyledInfoSection>
          <Grid container justify="center">
            <Grid item xs={11}>
              <Title
                text="Personal Information"
                textAlign="center"
                fontSize="10px"
                fontColor="black"
              />
            </Grid>
            <EditIcon />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name-edit"
                defaultValue={user.firstName}
                label="Name"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
                onChange={(e) => { setFirstName(e.target.value); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="surname-edit"
                defaultValue={user.lastName}
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
                label="E-mail"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
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
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="major-edit"
                defaultValue={profileInfo.major}
                label="Major"
                type="search"
                variant="outlined"
                style={{ width: '30em' }}
              />
            </Grid>
            <p>
              Semester :
              {profileInfo.semester}
            </p>
          </Grid>
        </StyledInfoSection>
        <StyledInfoSection>
          <Grid container justify="center">
            <Grid item xs={11}>
              <Title text="Technical" textAlign="center" fontSize="10px" fontColor="black" />
            </Grid>
            <EditIcon />
          </Grid>
          <p>
            Skill :
            {profileInfo.skills}
          </p>
          <p>
            Experience :
            {profileInfo.experiences}
          </p>
        </StyledInfoSection>
      </StyledSection>
    </div>
  );
};

export default EditForm;
