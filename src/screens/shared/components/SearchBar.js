import React from 'react';
import { styled, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: 500,

  },

});

function SearchBar() {
  const classes = useStyles();

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      className={classes.root}
      size="small"
    />
  );
}

export default SearchBar;
