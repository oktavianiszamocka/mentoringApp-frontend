import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Avatar, IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

}));

const ProjectMember = ({ member }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <IconButton href={`/profile/${member.idUser}`}>
        <Avatar alt={member.firstName} src={member.avatar} className={classes.large} />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        {member.firstName}
        {' '}

        {' '}
        {member.lastName}
      </Typography>
      <Typography variant="body1" gutterBottom>{member.projectRole}</Typography>
      <Typography align="center" variant="body1" gutterBottom>{member.major}</Typography>
      <Typography variant="body1" gutterBottom>
        Semester
        {' '}
        {member.semester}
      </Typography>

    </div>

  );
};
export default ProjectMember;
