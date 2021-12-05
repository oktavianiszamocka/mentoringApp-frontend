import React, { useState, useEffect } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { TextField, Grid, Button } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

} from '@material-ui/pickers';
import { Select, KeyboardDatePicker } from 'material-ui-formik-components';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
    flexShrink: '1',

  },
  fieldStyle: {
    width: '100%',
  },

}));
const StyledInfoSection = styled.section`
  margin: 1rem;
  padding: 1rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;
const ProjectInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required('Project Name is required'),
  description: Yup.string()
    .required('Project Description is required'),
  startDate: Yup.date()
    .required('Project Start Date is required'),
  endDate: Yup.date().min(
    Yup.ref('startDate'),
    "End date can't be before start date",
  ).nullable().default(null),
  status: Yup.string()
    .required('Project Status is required. Please set the project status'),
  superviserEmail: Yup.string().email('Invalid email')
    .required('Project must has superviser. Please enter the superviser email'),

});

const ProjectInfoForm = (props) => {
  const classes = useStyles();

  /*
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const successCallout = false;

    await props.onSubmit(values)
      .then((res) => {
        if (res === true) {
          // successCallout = true;
          // setReadOnly(true);
        }
      });

    if (successCallout) {
      setTimeout(() => {
        setSubmitting(false);
        resetForm();
      }, 1000);
    }
  };
  */

  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={ProjectInfoSchema}

    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty, isSubmitting, values, setFieldValue, handleReset,
        } = formik;
        return (
          <div className={classes.root}>

            <Form>
              <fieldset disabled={props.isReadOnly}>
                <Grid container item justify="center" spacing={2}>

                  <Grid item xs={12}>

                    <Field
                      as={TextField}
                      name="name"
                      required
                      label="Project Name"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.name && touched.name)}
                      helperText={errors.name && touched.name ? errors.name : null}
                    />

                  </Grid>
                  <Grid item xs={12}>

                    <Field
                      as={TextField}
                      name="description"
                      multiline
                      fullWidth
                      required
                      label="Description"
                      rows={4}
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.description && touched.description)}
                      helperText={errors.description && touched.description ? errors.description : null}
                    />

                  </Grid>
                  <Grid item xs={12}>

                    <Field
                      required
                      name="status"
                      label="Status"
                      variant="outlined"
                      options={props.statusOptions}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.status && touched.status)}
                      helperText={errors.status && touched.status ? errors.status : null}
                    />

                  </Grid>
                  <Grid item xs={12}>

                    <Field

                      name="studies"
                      label="Study"
                      variant="outlined"
                      options={props.studiesOptions}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.studies && touched.studies)}
                      helperText={errors.studies && touched.studies ? errors.studies : null}
                    />

                  </Grid>
                  <Grid item xs={12}>

                    <Field

                      name="mode"
                      label="Mode"
                      variant="outlined"
                      options={props.modeOptions}
                      component={Select}
                      className={classes.fieldStyle}
                      error={!!(errors.mode && touched.mode)}
                      helperText={errors.mode && touched.mode ? errors.mode : null}
                    />

                  </Grid>
                  <Grid item xs={12}>
                    {props.isEdit !== true
                    && (
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      variant="outlined"
                      name="superviserEmail"
                      label="Superviser Email"
                      className={classes.fieldStyle}
                      error={!!(errors.superviserEmail && touched.superviserEmail)}
                      helperText={errors.superviserEmail ? errors.superviserEmail : null}
                    />
                    )}
                  </Grid>
                  <Grid item xs={6}>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        className={classes.fieldStyle}
                        component={KeyboardDatePicker}
                        name="startDate"
                        label="Start Date"
                        format="dd/MM/yyyy"
                        clearable
                        autoOk
                        fullWidth
                        inputVariant="outlined"
                        error={!!(errors.startDate && touched.startDate)}
                        helperText={errors.startDate && touched.startDate ? errors.startDate : null}
                      />

                    </MuiPickersUtilsProvider>

                  </Grid>
                  <Grid item xs={6}>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        className={classes.fieldStyle}
                        component={KeyboardDatePicker}
                        name="endDate"
                        label="End Date"
                        format="dd/MM/yyyy"
                        clearable
                        autoOk
                        fullWidth
                        inputVariant="outlined"
                        error={!!(errors.endDate && touched.endDate)}
                        helperText={errors.endDate && touched.endDate ? errors.endDate : null}
                      />

                    </MuiPickersUtilsProvider>

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
                    // className={dirty && isValid ? '' : 'disabled-btn'}
                      disabled={!dirty || isSubmitting}
                    >
                      Submit
                    </Button>

                  </Grid>

                </Grid>
              </fieldset>

            </Form>

          </div>

        );
      }}

    </Formik>
  );
};

ProjectInfoForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  statusOptions: PropTypes.object,
  isReadOnly: PropTypes.bool,
  isEdit: PropTypes.bool,
  studiesOptions: PropTypes.object,
  modeOptions: PropTypes.object,

};

ProjectInfoForm.defaultProps = {
  initialValues: {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: null,
    superviserEmail: '',
    status: '',

  },

};

export default ProjectInfoForm;
