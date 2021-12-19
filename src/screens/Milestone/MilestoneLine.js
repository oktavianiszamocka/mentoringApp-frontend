import React, { useState } from 'react';
import {
  Button, Paper, Typography, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import Edit from '@material-ui/icons/Edit';
import Api from '../../api/index';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: '2px 4px ',
    margin: '5px',

  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: '10px 0px',
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  paperEdit: {
    padding: theme.spacing(2),
    margin: '10px 0px',
    textAlign: 'center',

    color: theme.palette.text.primary,
  },
  iconButton: {
    marginLeft: '13rem',

  },

}));

const MilestoneLine = ({ milestone, onEditHandler, isAllowToEdit }) => {
  const [isDone, setIsDone] = useState(milestone.isDone);
  const [milestoneDate, setMilestoneDate] = useState(milestone.date);
  const classes = useStyles();

  const changeDateFormat = (dat) => {
    if (dat == null) {
      return 'Pending..';
    }
    const date = new Date(dat);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) { dd = `0${dd}`; }
    if (mm < 10) { mm = `0${mm}`; }
    const d = `${dd}/${mm}/${yyyy}`;
    return d;
  };

  const handleUpdateToPassed = async (e) => {
    const now = new Date();
    const milestoneData = {
      idMilestone: e.idMilestone,
      description: e.description,
      project: e.project,
      sequence: e.sequence,
      isDone: true,
    };

    const updateMile = await Api.updateMilestoneToPassed(milestoneData)
      .then((response) => {
        setMilestoneDate(response.data.date);
        setIsDone(true);
      });
  };

  if (isDone) {
    return (
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {milestone.sequence}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Completion Date
            </Typography>
            <Typography variant="h6" component="h6">
              {changeDateFormat(milestoneDate)}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <CheckCircleIcon />
            </TimelineDot>

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>

            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                {milestone.description}
              </Typography>
            </Paper>

          </TimelineContent>
        </TimelineItem>

      </Timeline>

    );
  }

  return (
    <Timeline align="center">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {milestone.sequence}
          </Typography>

        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <CheckCircleIcon />
          </TimelineDot>

          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>

          <Paper elevation={3} className={classes.paperEdit}>
            { isAllowToEdit
            && (
            <IconButton size="small" onClick={onEditHandler} className={classes.iconButton}>
              <EditIcon size="small" />

            </IconButton>
            )}

            <Typography variant="h6" component="h1">
              {milestone.description}
            </Typography>
            { isAllowToEdit
            && (
            <Button
              className={classes.button}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => handleUpdateToPassed(milestone)}
            >
              Complete
            </Button>
            )}
          </Paper>

        </TimelineContent>
      </TimelineItem>
    </Timeline>

  );
};

export default MilestoneLine;
