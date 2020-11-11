import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
      padding: theme.spacing(0.2)
    },
  },
}));

const TagsComponent = ({ tags }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tags.map((tag) => (
        <Chip label={tag} ></Chip>
      ))}
    </div>
  );
};

export default TagsComponent;