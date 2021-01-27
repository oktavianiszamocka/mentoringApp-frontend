import React from 'react';
import { styled, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: 500,

  },

});

const SearchBar = ({ onEnterAction }) => {
  const classes = useStyles();

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      className={classes.root}
      size="small"
      onKeyPress={(e) => onEnterAction(e)}

    />
  );
};

export default SearchBar;
