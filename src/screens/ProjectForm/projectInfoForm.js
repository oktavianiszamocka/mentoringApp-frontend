import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { TextField, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

} from '@material-ui/pickers';
import { Select, KeyboardDatePicker } from 'material-ui-formik-components';
import DatePickerInput from '../shared/components/DatePickerInput';

const selectOptions = [

  { value: 'Discovery', label: 'Discovery' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Complete', label: 'Complete' },
  { value: 'Incomplete', label: 'Incomplete' },

];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
    flexShrink: '1',

  },

  formRow: {
    // width: '100%',
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
  ),
  status: Yup.string()
    .required('Project Status is required. Please set the project status'),
  superviserEmail: Yup.string().email('Invalid email')
    .required('Project must has superviser. Please enter the superviser email'),

});

const ProjectInfoForm = (props) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState('');

  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={ProjectInfoSchema}
    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty, isSubmitting, values, setFieldValue,
        } = formik;
        return (
          <div className={classes.root}>
            <StyledInfoSection>

              <Form>
                <Grid container justify="center" spacing={2}>

                  <Grid item xs={12}>
                    <div className="form-row">
                      <Field
                        as={TextField}
                        name="name"
                        required
                        label="Project Name"
                        variant="outlined"
                        className={classes.fieldStyle}
                      />
                      <ErrorMessage name="name" component="span" className="error" />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="formRow">
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
                      />
                      <ErrorMessage name="description" component="span" className="error" />
                    </div>

                  </Grid>
                  <Grid item xs={12}>
                    <div className="formRow">
                      <Field
                        required
                        name="status"
                        label="Status"
                        options={selectOptions}
                        component={Select}
                        className={classes.fieldStyle}
                      />
                      <ErrorMessage name="status" component="span" className="error" />
                    </div>

                  </Grid>
                  <Grid item xs={12}>
                    <div className="formRow">
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="superviserEmail"
                        label="Superviser Email"
                        className={classes.fieldStyle}
                      />
                      <ErrorMessage name="superviserEmail" component="span" className="error" />
                    </div>

                  </Grid>
                  <Grid item xs={12}>
                    <div className="formRow">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field
                          as="date"
                          component={DatePickerInput}
                          name="startDate"
                          fieldSet="startDate"
                          labelField="Start Date"
                        />

                      </MuiPickersUtilsProvider>
                      <ErrorMessage name="startDate" component="span" className="error" />
                    </div>

                  </Grid>
                  <Grid item xs={12}>
                    <div className="formRow">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field
                          as="date"
                          component={DatePickerInput}
                          name="endDate"
                          fieldSet="endDate"
                          labelField="End Date"
                        />
                        <ErrorMessage name="endDate" component="span" className="error" />

                      </MuiPickersUtilsProvider>
                    </div>

                  </Grid>

                  <button
                    type="submit"
                    className={dirty && isValid ? '' : 'disabled-btn'}
                  >
                    Submit
                  </button>

                </Grid>

              </Form>
            </StyledInfoSection>

          </div>

        );
      }}

    </Formik>
  );
};
ProjectInfoForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,

};

ProjectInfoForm.defaultProps = {
  initialValues: {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    superviserEmail: '',
    status: '',
  },
};

export default ProjectInfoForm;
