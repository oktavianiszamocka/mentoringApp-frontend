import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PropTypes from 'prop-types';
import { zIndex } from 'material-ui/styles';
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
    <Paper style={{ height: '6rem', backgroundColor: '#f4f6f8' }}>
      <Grid container>
        <Grid Item style={{ padding: 10, height: 20 }} xs="auto">
          <Grid container direction="row" spacing={0}>
            <Avatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.imageUrl} />
            <FiberManualRecordIcon
              fontSize="small"
              style={{
                fill: colorText, marginLeft: '-128px', marginTop: '50px', zIndex: '999',
              }}
            />
          </Grid>
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
