import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Avatar from '../shared/components/Avatar';

const userAvailability = ({ user }) => (
  <Paper style={{ height: '6rem', backgroundColor: '#f4f6f8' }}>
    <Grid container>
      <Grid Item style={{ padding: 10, height: 20 }} xs="auto">
        <Grid container direction="row" spacing={0}>
          <Avatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.imageUrl} idUser={user.idUser} />
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);

userAvailability.prototypes = {
  user: PropTypes.object.isRequired,
};

export default userAvailability;
