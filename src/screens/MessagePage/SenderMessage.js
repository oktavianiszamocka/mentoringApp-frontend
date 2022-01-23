import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

const StyledMessage = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    color: #4f5052;
    padding: 8px;
    border-radius: 6px;
    background-color: #e3e4e6;
    min-width: 50px;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '3rem',
    width: '100%',
  },
  iconcontainer: {
    padding: '10px',
  },
  message: {
    maxHeight: '25px',
    minWidth: '50px',
  },
  number: {
    maxHeight: '35px',
    maxWidth: '20px',

  },
  grid_container: {

  },
}));

const SenderMessage = ({
  message, senderUser,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.grid_container}>
      <Grid item className={classes.iconcontainer}>
        <Avatar alt="person image" src={senderUser.imageUrl} />
      </Grid>
      <Grid item xs={8}>
        <Grid container direction="column" spacing={0} style={{ width: 'max-content' }}>
          <Grid item className={classes.message}>
            <StyledMessage>
              {message}
            </StyledMessage>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

SenderMessage.prototypes = {
  message: PropTypes.object.isRequired,
  senderUser: PropTypes.object.isRequired,
};

export default SenderMessage;
