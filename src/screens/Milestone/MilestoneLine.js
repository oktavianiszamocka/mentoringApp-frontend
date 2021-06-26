import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
    button: {
        padding: '16px 20px ',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));


const MilestoneLine = ({ milestone }) => {
    const classes = useStyles();
    const [flag, setFlag] = React.useState(true);

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

    const handleClick = () => {
        setFlag(!flag);
    };

if( milestone.isDone){

    return (
        <Timeline align="alternate">
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {milestone.sequence}
                </Typography>
                <Typography variant="h6" component="h6">
                        {changeDateFormat(milestone.date)}
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
                <Typography variant="h6" component="h6">
                        {changeDateFormat(milestone.date)}
                    </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot color="secondary">
                    <CheckCircleIcon />
                </TimelineDot>
                
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>

            <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
                        {milestone.description}
                    </Typography>

                    <Button variant= "contained" size="small" color="secondary">
          Complete
        </Button>
          </Paper>

                
            </TimelineContent>
        </TimelineItem>
</Timeline>

);
};




   

export default MilestoneLine;