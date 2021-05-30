import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  TextField, Grid, Button, FormControl,
} from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

} from '@material-ui/pickers';
import { Select, KeyboardDatePicker } from 'material-ui-formik-components';
import DatePickerInput from '../shared/components/DatePickerInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),

    },
    flexGrow: 1,

  },
  fieldStyle: {
    width: '100%',
    margin: '3px',

  },

}));
const StyledInfoSection = styled.section`
  margin: 1rem;
  padding: 1rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const ProjectMemberSchema = Yup.object().shape({
  projectMember1: Yup.string().email('Invalid email')
    .required('Project should at least have 1 member'),
  Role1: Yup.string().when('projectMember1', {
    is: (value) => value && value.length > 0,
    then: Yup.string().required('Please fill the role'),
    otherwise: Yup.string(),
  }),
  projectMember2: Yup.string().email('Invalid email'),
  Role2: Yup.string().when('projectMember2', {
    is: (value) => value && value.length > 0,
    then: Yup.string().required('Please fill the role'),
    otherwise: Yup.string(),
  }),
  projectMember3: Yup.string().email('Invalid email'),
  Role3: Yup.string().when('projectMember3', {
    is: (value) => value && value.length > 0,
    then: Yup.string().required('Please fill the role'),
    otherwise: Yup.string(),
  }),
  projectMember4: Yup.string().email('Invalid email'),
  Role4: Yup.string().when('projectMember4', {
    is: (value) => value && value.length > 0,
    then: Yup.string().required('Please fill the role'),
    otherwise: Yup.string(),
  }),
  projectMember5: Yup.string().email('Invalid email'),
  Role5: Yup.string().when('projectMember5', {
    is: (value) => value && value.length > 0,
    then: Yup.string().required('Please fill the role'),
    otherwise: Yup.string(),
  }),
});

const ProjectMembersForm = (props) => {
  const classes = useStyles();

  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={ProjectMemberSchema}
    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty, isSubmitting, values, setFieldValue,
        } = formik;
        return (
          <div className={classes.root}>

            <Form>
              <FormControl className={classes.formControl}>

                <Grid item xs={12} container spacing={2} alignItems="flex-start" justify="center">
                  <Grid item xs={6}>

                    <Field
                      as={TextField}
                      name="projectMember1"
                      required
                      label="Project Member 1 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.projectMember1 && touched.projectMember1)}
                      helperText={errors.projectMember1 && touched.projectMember1 ? errors.projectMember1 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="Role1"
                      label="Role Project Member 1"
                      variant="outlined"
                      options={props.roleOption}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.Role1 && touched.Role1)}
                      helperText={errors.Role1 && touched.Role1 ? errors.Role1 : null}
                    />
                  </Grid>

                  <Grid item xs={6}>

                    <Field
                      as={TextField}
                      name="projectMember2"
                      label="Project Member 2 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.projectMember2 && touched.projectMember2)}
                      helperText={errors.projectMember2 && touched.projectMember2 ? errors.projectMember2 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      name="Role2"
                      label="Role Project Member 2"
                      variant="outlined"
                      options={props.roleOption}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.Role2 && touched.Role2)}
                      helperText={errors.Role2 && touched.Role2 ? errors.Role2 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      as={TextField}
                      name="projectMember3"
                      label="Project Member 3 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.projectMember3 && touched.projectMember3)}
                      helperText={errors.projectMember3 && touched.projectMember3 ? errors.projectMember3 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      name="Role3"
                      label="Role Project Member 3"
                      variant="outlined"
                      options={props.roleOption}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.Role3 && touched.Role3)}
                      helperText={errors.Role3 && touched.Role3 ? errors.Role3 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      as={TextField}
                      name="projectMember4"
                      label="Project Member 4 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.projectMember4 && touched.projectMember4)}
                      helperText={errors.projectMember4 && touched.projectMember4 ? errors.projectMember4 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      name="Role4"
                      label="Role Project Member 4"
                      variant="outlined"
                      options={props.roleOption}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.Role4 && touched.Role4)}
                      helperText={errors.Role4 && touched.Role4 ? errors.Role4 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      as={TextField}
                      name="projectMember5"
                      label="Project Member 5 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.projectMember5 && touched.projectMember5)}
                      helperText={errors.projectMember5 && touched.projectMember5 ? errors.projectMember5 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      name="Role5"
                      label="Role Project Member 5"
                      variant="outlined"
                      options={props.roleOption}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.Role5 && touched.Role5)}
                      helperText={errors.Role5 && touched.Role5 ? errors.Role5 : null}
                    />

                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={dirty && isValid ? '' : 'disabled-btn'}
                    >
                      Submit
                    </Button>

                  </Grid>

                </Grid>
              </FormControl>

            </Form>

          </div>

        );
      }}

    </Formik>
  );
};
ProjectMembersForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  roleOption: PropTypes.object.isRequired,

};

ProjectMembersForm.defaultProps = {
  initialValues: {
    projectMember1: '',
    Role1: '',
    projectMember2: '',
    Role2: '',
    projectMember3: '',
    Role3: '',
    projectMember4: '',
    Role4: '',
    projectMember5: '',
    Role5: '',
  },
};

export default ProjectMembersForm;
