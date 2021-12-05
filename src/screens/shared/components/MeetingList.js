import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  notes: {
    margin: '0px 10px',
  },
}));

const meetings = [{
  meetingId: 1, meetingname: 'hey', author: 'Amon', subject: 'aaaa',
},
{
  meetingId: 2, meetingname: 'hey', author: 'Amon', subject: 'aaaa',
},
{
  meetingId: 3, meetingname: 'meet3', author: 'Amon', subject: 'ccc',
}];

const MeetingList = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  console.log(selectedIndex);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" className={classes.title}>
        Meetings Notes
      </Typography>
      <div className={classes.demo}>
        <List component="nav">

          {meetings.map((meeting) => (
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, meeting.meetingId)}
            >
              <ListItemIcon>
                <NoteOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                dense="true"
                className={classes.notes}
                primary={meeting.meetingname}
              />
              <ListItemText
                dense="true"
                className={classes.notes}
                primary={meeting.meetingname}
              />
              <ListItemText
                dense="true"
                className={classes.notes}
                primary={meeting.subject}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Grid>
  );
};

export default MeetingList;
