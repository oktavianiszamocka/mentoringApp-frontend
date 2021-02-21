import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
}));

const MilestoneInfo = ({ milestone }) => {
    const classes = useStyles();
    const [flag, setFlag] = React.useState(true);

    const handleClick = () => {
        setFlag(!flag);
    };

    return (

        <Timeline align="alternate">
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        {milestone.sequence}
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <CheckCircleIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>

                    <Button
                        className={classes.button}
                        onClick={handleClick}
                        variant="contained"
                        color={flag ? 'primary' : 'secondary'}
                    >
                        <Typography variant="h6" component="h1">
                            {milestone.description}
                        </Typography>
                    </Button>

                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
};

export default MilestoneInfo;
