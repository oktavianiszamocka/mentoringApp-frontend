import React from "react";
import {Button, Paper,TextField} from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      background: '#ffff80',
      Height: '50px',
    },
}));



const NoteSchema = Yup.object().shape({
    notetext : Yup.string()
    .required('Please enter the note text')
});

const NoteForm = (props) => {
    const classes = useStyles();
    return (
        <Formik
          onSubmit={props.onSubmit}
          validationSchema={NoteSchema}
          initialValues={props.initialValues}
        >
            <Form>
                <Paper elevation={3} className={classes.paper}>
                    <div style={{ display: 'inline-grid' }}>
                    <Field as={TextField} name="notetext" placeholder='Please write your note here' />
                    </div>
                
                <Button
              style={{ margin: '15px' }}
              size='small' 
              type="submit"
              color="primary"
              variant="contained"
              autoFocus> Submit
            </Button>
            </Paper>
            </Form>

        </Formik>
);};

NoteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object
}

NoteForm.defaultProps = {
    initialValues: {
        notetext : ''
    }
}

export default NoteForm;