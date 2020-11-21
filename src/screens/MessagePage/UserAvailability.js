import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PropTypes from 'prop-types';
import Avatar from '../shared/components/Avatar';
import Title from '../shared/components/Title';

const userAvailability = ({ user, active }) => {
  let availableText;
  let colorText;
  if (active) {
    availableText = 'Active';
    colorText = 'green';
  } else {
    availableText = 'Not Active';
    colorText = 'red';
  }

  return (
    <Paper style={{ height: '6rem' }}>
      <Grid container>
        <Grid Item style={{ padding: 10, height: 20 }} xs="auto">
          <Avatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.imageUrl} />
        </Grid>
        <Grid item xs={1} container direction="column">
          <Grid Item />
          <Grid Item style={{ marginTop: 25, marginLeft: 0 }}>
            <FiberManualRecordIcon style={{ fill: colorText }} />
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: -25, marginLeft: 50 }}>
          <Title text={availableText} textAlign="left" fontColor={colorText} fontSize="0.9rem" />
        </Grid>
      </Grid>
    </Paper>
  );
};

userAvailability.prototypes = {
  user: PropTypes.object.isRequired,
  active: PropTypes.bool,
};

userAvailability.defaultProps = {
  active: false,
};

export default userAvailability;
