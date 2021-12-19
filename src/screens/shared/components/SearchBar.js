import React from 'react';
import { styled, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: 'auto',

  },
  icon: {
    color: 'grey',
  },
  search: {
    width: '92%',
    margin: '10px',
    backgroundColor: '#e6e7eb',
    borderRadius: '2px',
  },
  noBorder: {
    border: 'none',
  },

});

const SearchBar = ({ onEnterAction }) => {
  const classes = useStyles();
  const icon = <SearchIcon className={classes.icon} />;

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      className={classes.search}
      size="small"
      onKeyPress={(e) => onEnterAction(e)}
      InputProps={{
        endAdornment: icon,
        classes: { notchedOutline: classes.noBorder },
      }}
    />
  );
};

export default SearchBar;
