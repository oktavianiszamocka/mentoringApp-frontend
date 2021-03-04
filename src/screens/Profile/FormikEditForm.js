import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import MaterialAvatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Title from '../shared/components/Title';
import Api from '../../api/index';
import * as Yup from 'yup';

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

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Enter a valid email').required('Required'),
});

const FormikEditForm = ({profileInfo}) => {
  const dateOfBirthFormat = moment(profileInfo.dateOfBirth).format('LL');

  const [selectedDate, setSelectedDate] = useState(dateOfBirthFormat);
  const [onUpdateAction, setUpdateAction] = useState(false);
  const [updateProfileInitialValue, setUpdateProfileInitialValue] = useState(profileInfo);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onProfileUpdateHandler = async (profileData) => {
    await Api.updateProfileData(profileData)
      .then((res) => {
        if (res.status === 200) {
          window.location = `/profile/${profileInfo.user}`;
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      lastName: profileInfo.lastName,
      firstName: profileInfo.firstName,
      email: profileInfo.email,
      phone: profileInfo.phone,
      dateOfBirth: new Date(selectedDate),
      country: profileInfo.country,
      major: profileInfo.major,
      semester: profileInfo.semester,
      skills: profileInfo.skills,
      experiences: profileInfo.experiences,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      const profileData = {
        idUser: profileInfo.user,
        idProfile: profileInfo.idProfile,
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        country: values.country,
        major: values.major,
        semester: values.semester,
        skills: values.skills,
        experiences: values.experiences,
      };

      onProfileUpdateHandler(profileData);

    },
  });

  return (
      <div>
        <StyledSection>
          <Grid container spacing={1}>
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
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>                
                <Grid item xs={12}>
                    <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="lastName"
                    name="lastName"                    
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="email"
                    name="email"
                    label="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
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
                    id="country"
                    name="country"
                    label="Country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="major"
                    name="major"
                    label="Major"
                    value={formik.values.major}
                    onChange={formik.handleChange}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="semester"
                    name="semester"
                    label="Semester"
                    value={formik.values.semester}
                    onChange={formik.handleChange}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="skills"
                    name="skills"
                    label="Skill"
                    value={formik.values.skills}
                    onChange={formik.handleChange}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="experiences"
                    name="experiences"
                    label="Experiences"
                    value={formik.values.experiences}
                    onChange={formik.handleChange}
                    type="search"
                    variant="outlined"
                    style={{ width: '30em' }}
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
                    type="submit"
                    >
                    Save changes
                    </Button>
                </Grid>
                </Grid>                
            </form>
          </StyledInfoSection>
        </StyledSection>
      </div>
  );
};

export default FormikEditForm;
