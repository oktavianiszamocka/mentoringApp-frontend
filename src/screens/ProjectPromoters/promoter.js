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

const ProjectPromoter = ({ promoter }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <IconButton href="../profile">
        <Avatar alt={promoter.firstName} src={promoter.imageUrl} className={classes.large} />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        {promoter.firstName}
        {' '}

        {' '}
        {promoter.lastName}
      </Typography>

    </div>

  );
};
export default ProjectPromoter;
