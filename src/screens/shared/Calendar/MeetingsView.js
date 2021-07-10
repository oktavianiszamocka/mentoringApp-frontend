import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const StyledDiv = styled.div`
  background-color: white;
  min-width: 150px;
  min-height: 360px;
  border-left: 1px solid #9e9e99;
`;
const StyledDiv2 = styled.div`
  background-color: #3f51b5;
  min-width: 150px;
  min-height: 100px;
  margin: 0;
`;

const StyledP = styled.p`
  font-family: 'Roboto', arial;
  font-size: 25px;
  color: white;
  background-color: #3f51b5;
  text-align: center;
  margin-top: 40px;
  `;

const useStyles = makeStyles({
  avatar: {
    fontSize: '30px',
    marginRight: '5px',
  },
  close: {
    fontSize: '20px',
    marginLeft: '100px',
  },
  grid: {
    marginBottom: '-15px',
  },
  button: {
    width: '20px',
    marginTop: '5px',
    marginLeft: '50px',
  },
});

const MeetingsView = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <StyledDiv>
      <Grid container direction="column" className={classes.grid}>
        <StyledDiv2>
          <StyledP>Meetings</StyledP>
        </StyledDiv2>
        <List dense className={classes.root}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value} button>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItem>
            );
          })}
        </List>
        <Button variant="contained" color="primary" className={classes.button}>
          Add
        </Button>
      </Grid>
    </StyledDiv>
  );
};

export default MeetingsView;
