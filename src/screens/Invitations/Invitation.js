import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActions, CardContent, Button, Link, Typography, Grid, Avatar,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '0.5rem',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardAction: {
    marginTop: '-1rem',
  },
}));
const InvitationCard = ({ invitation, onAcceptAction, onRejectAction }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Avatar alt="Supervisor" src={invitation.avatar} className={classes.avatar} />

            </Grid>
            <Grid item xs={10}>
              {invitation.isMemberInvitation && (
              <Typography variant="subtitle1" gutterBottom>

                {invitation.projectOwnerName}
                {' '}
                invites you to be member of Project
                {' '}
                <Link href={`/project-detail/${invitation.idProject}`}>
                  {invitation.projectName}
                </Link>
                {' '}
                as
                {' '}
                {invitation.roleName}
              </Typography>
              )}

              {!invitation.isMemberInvitation && (
              <Typography variant="subtitle1" gutterBottom>

                {invitation.projectOwnerName}
                {' '}
                invites you to be supervisor of Project
                {' '}
                <Link href={`/project-detail/${invitation.idProject}`}>
                  {invitation.projectName}
                </Link>

              </Typography>
              )}

            </Grid>

          </Grid>

        </CardContent>
        <CardActions className={classes.cardAction}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={2}>
              <Button size="small" variant="contained" color="primary" onClick={onAcceptAction}>Accept</Button>

            </Grid>
            <Grid item xs={2}>
              <Button size="small" variant="contained" color="secondary" onClick={onRejectAction}>Reject</Button>

            </Grid>

          </Grid>

        </CardActions>

      </Card>
    </div>
  );
};

InvitationCard.prototype = {
  invitation: PropTypes.object.prototype,
  onAcceptAction: PropTypes.func,
  onRejectAction: PropTypes.func,
};

export default InvitationCard;
