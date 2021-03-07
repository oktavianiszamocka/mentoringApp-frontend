import React from 'react';
import {
    Formik, Form, Field,
} from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { TextField, Grid, Button } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../api/index';

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
const ProjectInfoSchema = Yup.object().shape({
    description: Yup.string()
        .required('Milestone Description is required'),
});

const ProjectMilestoneForm = (props) => {
    const classes = useStyles();

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

                        <Form>
                            <Grid container item justify="center" spacing={2}>

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

                        </Form>

                    </div>

                );
            }}

        </Formik>
    );
};
ProjectMilestoneForm.prototype = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    statusOptions: PropTypes.object,

};

ProjectMilestoneForm.defaultProps = {
    initialValues: {
        description: 'milestone description...',
    },
};

export default ProjectMilestoneForm;
