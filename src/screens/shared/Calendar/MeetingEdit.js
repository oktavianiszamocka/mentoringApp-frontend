import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  Formik, Form, Field, ErrorMessage, FieldArray,
} from 'formik';
import * as Yup from 'yup';
import Chip from '@material-ui/core/Chip';
import MaterialAvatar from '@material-ui/core/Avatar';
import Api from '../../../api/index';

const StyledDiv = styled.div`
  background-color: white;
  position: absolute;
  max-width: 250px;
  min-height: 250px;
  max-height: 750px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #9e9e99;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledUnderTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 12px;
   font-weight: bold;
   color: #4f5052;
`;

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 12px;
  color: #4f5052;
  margin: 0px;
`;

const useStyles = makeStyles((theme) => ({
  avatar1: {
    fontSize: '30px',
    marginRight: '5px',
    marginTop: '-5px',
  },
  avatar2: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '5px',
    marginTop: '-5px',
    marginBottom: '5px',

  },
  close: {
    fontSize: '20px',
    marginLeft: '15px',
  },
  grid: {
    marginBottom: '-15px',
  },
  title: {
    marginLeft: '2px',
    marginBottom: '15px',
    width: '190px',
  },
  resize: {
    fontSize: '13px',
  },
  description: {
    marginBottom: '10px',
    marginTop: '20px',
    width: '230px',
  },
  prioritySelect: {
    width: '140px',
    marginLeft: '20px',
    fontSize: '13px',
    marginTop: '5px',

  },
  resize2: {
    fontSize: '13px',
    marginLeft: '7px',
  },
  datepick: {
    width: '180px',
    marginLeft: '10px',
    fontSize: '10px',
    marginTop: '6px',

  },
  datepick2: {
    width: '168px',
    marginLeft: '10px',
    fontSize: '10px',
    marginTop: '6px',

  },
  button: {
    marginLeft: '85px',
    marginTop: '8px',
  },
  formControl: {
    marginTop: '10px',
    marginBottom: '5px',
    minWidth: 190,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

const MeetingEdit = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  };

  const styles = {
    position: 'absolute',
    zIndex: 8,
    top: '-5px',
    left: '-5px',
  };

  const closeAdd = () => {
    props.close(false);
  };

  return (

    <StyledDiv style={styles}>
      <Grid container direction="row" className={classes.grid}>
        <Grid item>
          <TextField
            id="title"
            name="title"
            label="Enter title"
            type="search"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            className={classes.title}
          />
        </Grid>
        <CloseIcon className={classes.close} onClick={closeAdd} />
      </Grid>
      <TextField
        id="description"
        name="description"
        label="Enter description"
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
      <Grid container direction="row">
        <StyledUnderTitle>PEOPLE</StyledUnderTitle>
        <Grid container direction="row">
          <Grid item>
            <MaterialAvatar
              className={classes.avatar2}
            />
          </Grid>
          <Grid item>
            <div>
              <StyledP style={{ marginTop: '2px' }}>
                Maria Wilk
              </StyledP>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

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
    </StyledDiv>

  );
};

export default MeetingEdit;
