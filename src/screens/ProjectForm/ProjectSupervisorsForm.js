import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
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
import CloseIcon from '@material-ui/icons/Close';
import DatePickerInput from '../shared/components/DatePickerInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
    flexShrink: '1',

  },
  fieldStyle: {
    width: '95%',
  },

}));
const StyledInfoSection = styled.section`
  margin: 1rem;
  padding: 1rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;
const ProjectSupervisorSchema = Yup.object().shape({
  superviser2Email: Yup.string().email('Invalid email'),
  superviser3Email: Yup.string().email('Invalid email'),
  superviser4Email: Yup.string().email('Invalid email'),
  superviser5Email: Yup.string().email('Invalid email'),
});

const ProjectSupervisorsForm = (props) => {
  const classes = useStyles();

  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={ProjectSupervisorSchema}

    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty, isSubmitting, values, setFieldValue,
        } = formik;
        return (
          <div className={classes.root}>

            <Form>
              <fieldset disabled={props.isReadOnly}>
                <Grid container item justify="center" spacing={2}>

                  <Grid item xs={12}>

                    <Field
                      id="superviser-2"
                      as={TextField}
                      name="superviser2Email"
                      label="Supervisor 2 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.superviser2Email && touched.superviser2Email)}
                      helperText={errors.superviser2Email && touched.superviser2Email ? errors.superviser2Email : null}
                    />

                    {props.isEdit && <CloseIcon id="2" onClick={props.closeIconAction} /> }

                  </Grid>
                  <Grid item xs={12}>

                    <Field
                      id="superviser-3"
                      as={TextField}
                      name="superviser3Email"
                      label="Supervisor 3 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.superviser3Email && touched.superviser3Email)}
                      helperText={errors.superviser3Email && touched.superviser3Email ? errors.superviser2Email : null}
                    />

                    {props.isEdit && <CloseIcon id="3" onClick={props.closeIconAction} /> }
                  </Grid>
                  <Grid item xs={12}>

                    <Field
                      id="superviser-4"
                      as={TextField}
                      name="superviser4Email"
                      label="Supervisor 4 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.superviser4Email && touched.superviser4Email)}
                      helperText={errors.superviser4Email && touched.superviser4Email ? errors.superviser2Email : null}
                    />

                    {props.isEdit && <CloseIcon id="4" onClick={props.closeIconAction} /> }
                  </Grid>
                  <Grid item xs={12}>

                    <Field
                      id="superviser-5"
                      as={TextField}
                      name="superviser5Email"
                      label="Supervisor 5 Email"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.superviser5Email && touched.superviser5Email)}
                      helperText={errors.superviser5Email && touched.superviser5Email ? errors.superviser2Email : null}
                    />
                    {props.isEdit && <CloseIcon id="5" onClick={props.closeIconAction} /> }
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {!props.isReadOnly && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={dirty && isValid ? '' : 'disabled-btn'}
                    >
                      Submit
                    </Button>
                    )}

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
ProjectSupervisorsForm.prototype = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  isReadOnly: PropTypes.bool,
  isEdit: PropTypes.bool,
  closeIconAction: PropTypes.func,

};

ProjectSupervisorsForm.defaultProps = {
  initialValues: {
    superviser2Email: '',
    superviser3Email: '',
    superviser4Email: '',
    superviser5Email: '',
  },
};

export default ProjectSupervisorsForm;
