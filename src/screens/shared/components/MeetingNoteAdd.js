import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Formik, Form, Field, ErrorMessage, FieldArray,
} from 'formik';
import {
  Grid, Button,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import * as Yup from 'yup';
import Chip from '@material-ui/core/Chip';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: absolute;
  padding: 10px;
`;

const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #4f5052;
`;
const useStyles = makeStyles({
  close: {
    fontSize: '20px',
    marginLeft: '135px',

  },
  grid: {
    marginBottom: '-15px',
  },
  title: {
    marginLeft: '2px',
    marginBottom: '25px',
    marginTop: '-10px',
    width: '225px',
  },
  resize: {
    fontSize: '13px',
  },
  resize_time: {
    fontSize: '13px',
    padding: '8px',
  },
  description: {
    marginBottom: '10px',
    width: '30vw',
  },

  times: {
    marginBottom: '5px',
    marginTop: '-2px',
    width: '30vw',
  },
  times_grid: {
    marginRight: '25px',
  },
  times_grid2: {
    marginLeft: '15px',
    marginRight: '25px',
  },

  resize2: {
    fontSize: '13px',
    marginLeft: '7px',
  },
  button: {
    textAlign: 'center',
    margin: 'auto',
  },

  error: {
    color: 'rgb(255,0,0,0.6)',
    marginTop: '-20px',
    marginLeft: '5px',
    marginBottom: '10px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
  error2: {
    color: 'rgb(255,0,0,0.6)',
    marginLeft: '5px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
});

function MeetingNoteAdd(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { onClose, open } = props;
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    onClose();
  };

  const initialValues = {
    title: '',
    subject: '',
    author: Api.getUserId(),
    meeting: 16,
    note1: '',
    createdOn: new Date(),
    lastModified: new Date(),
  };

  const onNoteAddHandler = async (noteData) => {
    console.log(noteData);
    await Api.addMeetingNote(noteData)
      .then(async () => {
        console.log('sucess');
        handleClose();
      });
  };

  const onSubmit = (values) => {
    const noteData = {
      title: values.title,
      subject: values.subject,
      author: Api.getUserId(),
      meeting: 16,
      note1: values.note1,
      createdOn: new Date(),
      lastModified: new Date(),
    };
    onNoteAddHandler(noteData);
  };

  const validate = Yup.object({
    title: Yup.string().required('Required'),
    subject: Yup.string().required('Required'),
    note1: Yup.string().min(10, 'Must be at least 10 characters').required('Required'),

  });

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullScreen={fullScreen}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validate}
        >
          {(formik) => {
            const {
              errors, touched,
            } = formik;
            return (
              <Form>
                <Grid container direction="row" className={classes.grid}>
                  <Grid item lg={10}>
                    <DialogTitle id="simple-dialog-title">Add meeting note</DialogTitle>
                  </Grid>
                  <Grid item lg={2}>
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={classes.times_grid2}
                >
                  <Grid
                    item
                    className={classes.times_grid}
                  >
                    <Grid container direction="column">
                      <Grid item>
                        <StyledUnderTitle>TITLE</StyledUnderTitle>
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          id="title"
                          name="title"
                          className={classes.times}
                          InputProps={{
                            classes: {
                              input: classes.resize_time,
                            },
                          }}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className={classes.error2}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <StyledUnderTitle>SUBJECT</StyledUnderTitle>
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          id="subject"
                          name="subject"
                          className={classes.times}
                          InputProps={{
                            classes: {
                              input: classes.resize_time,
                            },
                          }}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="subject"
                          component="div"
                          className={classes.error2}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  className={classes.times_grid2}
                >

                  <Grid item>
                    <StyledUnderTitle>NOTE</StyledUnderTitle>
                  </Grid>
                  <Grid item>
                    <div>
                      <Field
                        as={TextField}
                        id="note1"
                        name="note1"
                        label="Enter note"
                        className={classes.description}
                        multiline
                        rows={3}
                        InputProps={{
                          classes: {
                            input: classes.resize,
                          },
                        }}
                        variant="outlined"
                      />
                      <ErrorMessage
                        name="note1"
                        component="div"
                        className={classes.error2}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container direction="row">

                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>

  );
}

MeetingNoteAdd.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MeetingNoteAdd;
