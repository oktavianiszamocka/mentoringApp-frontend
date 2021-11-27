import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  TextField, Grid, Button, FormControl,
} from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import { Select } from 'material-ui-formik-components';

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
  url1: Yup.string(),
  url2: Yup.string(),

});

const ProjectUrlsForm = (props) => {
  const classes = useStyles();
  const urlType1Helper = 'A page that is used to list tasks in a project (e.g. Jira, Trello)';
  const urlType2Helper = 'A page from a code repository (e.g. Github, Bitbucket, Gitlab)';

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
                      name="url1_type"
                      label="Url Type"
                      variant="outlined"
                      options={props.urlTypeOption}
                      component={Select}
                      className={classes.fieldStyle}
                      defaultValue={1}
                      error={!!(errors.url1_type && touched.url1_type)}
                      helperText={errors.url1_type && touched.url1_type ? errors.Role1 : urlType1Helper}
                    />
                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      as={TextField}
                      name="url1"
                      label="Url"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.url1 && touched.url1)}
                      helperText={errors.url1 && touched.url1 ? errors.url1 : null}
                    />

                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="url2_type"
                      label="Url Type"
                      variant="outlined"
                      options={props.urlTypeOption}
                      component={Select}
                      className={classes.fieldStyle}
                      defaultValue={2}
                      error={!!(errors.url2_type && touched.url2_type)}
                      helperText={errors.url2_type && touched.url2_type ? errors.url2_type : urlType2Helper}
                    />
                  </Grid>
                  <Grid item xs={6}>

                    <Field
                      as={TextField}
                      name="url2"
                      label="Url"
                      variant="outlined"
                      className={classes.fieldStyle}
                      error={!!(errors.url2 && touched.url2)}
                      helperText={errors.url2 && touched.url2 ? errors.url2 : null}
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
                      disabled={!dirty || isSubmitting}
                      className={dirty && isValid ? '' : 'disabled-btn'}
                    >
                      Add Project Urls
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
ProjectUrlsForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  urlTypeOption: PropTypes.object.isRequired,

};

ProjectUrlsForm.defaultProps = {
  initialValues: {
    url1_type: '1',
    url1: '',
    url2_type: '2',
    url2: '',

  },
};

export default ProjectUrlsForm;
