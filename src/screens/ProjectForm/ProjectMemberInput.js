import React, { useState } from 'react';
import {
  TextField, Grid, Button, FormControl,
} from '@material-ui/core';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
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
  closeIcon: {
    marginTop: '0.3rem',

  },
  hidden: {
    display: 'none',
  },

}));

const ProjectMembersInput = ({
  idProjectMember, name, role, isEdit, roleOption, removeAction, roleDefaultValue, changeSubmit,
}) => {
  const classes = useStyles();

  return (

    <Formik
      onSubmit={changeSubmit}
      initialValues={{ idProjectMemberField: idProjectMember, roledropdown: roleDefaultValue }}
    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty, isSubmitting, values, setFieldValue,
        } = formik;
        return (
          <div className={classes.root}>
            <Form>

              <Grid item xs={12} container spacing={2} alignItems="flex-start" justify="center">
                <Grid item xs={5}>
                  <Field
                    name="idProjectMemberField"
                    as={TextField}
                    variant="outlined"
                    className={classes.hidden}
                    defaultValue={idProjectMember}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Field
                    name="name"
                    as={TextField}
                    id="standard-read-only-input"
                    label="Name"
                    variant="outlined"
                    className={classes.fieldStyle}
                    defaultValue={name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                {!isEdit && (
                  <Grid item xs={6}>
                    <Field
                      name="role"
                      as={TextField}
                      id="standard-read-only-input"
                      label="Role"
                      variant="outlined"
                      className={classes.fieldStyle}
                      defaultValue={role}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                  </Grid>
                )}
                {isEdit && (
                  <Grid item xs={5}>

                    <Field
                      name="roledropdown"
                      label="Role"
                      variant="outlined"
                      options={roleOption}
                      component={Select}
                      className={classes.fieldStyle}
                      defaultValue={roleDefaultValue}
                      error={!!(errors.roledropdown && touched.roledropdown)}
                      helperText={errors.roledropdown && touched.roledropdown ? errors.roledropdown : null}
                    />

                  </Grid>
                ) }
                {isEdit && (
                  <div>
                    <Grid item xs={1}>

                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                        className={dirty && isValid ? '' : 'disabled-btn'}
                        disabled={!dirty || isSubmitting}
                      >
                        Change
                      </Button>

                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => removeAction(idProjectMember)}
                        className={classes.closeIcon}
                      >
                        Remove

                      </Button>

                    </Grid>
                  </div>
                )}

              </Grid>

            </Form>
          </div>

        );
      }}
    </Formik>

  );
};

export default ProjectMembersInput;
