import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DatePickerInput from '../shared/components/DatePickerInput';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}));
const StyledSection = styled.section`
  margin: 2rem;
  background-color: #f5f5f5;
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
          <div>
            <Form>

              <div className="form-row">
                <Field
                  as={TextField}
                  name="name"
                  label="Project Name"
                  variant="outlined"
                  className={errors.name && touched.name
                    ? 'input-error' : null}
                />
                <ErrorMessage name="Name" component="span" className="error" />
              </div>
              <div className="form-row">
                <Field
                  as={TextField}
                  name="description"
                  multiline
                  label="Description"
                  rows={4}
                  variant="outlined"
                  className={errors.description && touched.description
                    ? 'input-error' : null}
                />
                <ErrorMessage name="description" component="span" className="error" />
              </div>
              <div className="form-row">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Field
                    as="date"
                    component={DatePickerInput}
                    name="startDate"
                    fieldSet="startDate"
                    labelField="Start Date"

                  />

                </MuiPickersUtilsProvider>
              </div>
              <div className="form-row">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Field
                    as="date"
                    component={DatePickerInput}
                    name="endDate"
                    fieldSet="endDate"
                    labelField="End Date"

                  />

                </MuiPickersUtilsProvider>
              </div>
              <button
                type="submit"
                className={dirty && isValid ? '' : 'disabled-btn'}
                disabled={!(dirty && isValid)}
              >
                Submit
              </button>

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

};

ProjectInfoForm.defaultProps = {
  initialValues: {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    superviser: '',
    status: '',
  },
};

export default ProjectInfoForm;
