import React from 'react';
import { styled, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: 'auto',

  },

});

const SearchBar = ({ onEnterAction, styleSearch }) => {
  const classes = useStyles();

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      className={styleSearch}
      size="small"
      onKeyPress={(e) => onEnterAction(e)}

    />
  );
};

export default SearchBar;
