import React, { useState, useEffect } from 'react';
import { Grid, Button, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import InvitationCard from './Invitation';
import Api from '../../api/index';
import ConfirmDialog from '../shared/components/ConfirmDialog';

const useStyles = makeStyles({
  alert: {
    backgroundColor: 'rgba(255,165,0,0.2)',
    color: 'black',
    width: '20rem',
    margin: '1rem 4rem',

  },
});

const InvitationPopOver = () => {
  const classes = useStyles();
  const [acceptInvitationDialogOptions, setAcceptInvitationDialogOptions] = useState({
    title: 'Accept Invitation',
    mainText: 'Are you sure you want to accept this invitation?',
    id: null,
    open: false,
  });

  const [rejectInvitationDialogOptions, setRejectInvitationDialogOptions] = useState({
    title: 'Reject Invitation',
    mainText: 'Are you sure you want to reject this invitation?',
    id: null,
    open: false,
  });

  const [open, setOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [totalInvitation, setCountInvitations] = useState('');

  const loadData = async () => {
    const response = await Promise.all([Api.getInvitationOfUser()]);
    setInvitations(response[0].data.data);
    setCountInvitations(response[0].data.totalRecords);
  };
  useEffect(() => {
    loadData();
  }, []);

  const onAcceptHandler = (idInvitation) => {
    setAcceptInvitationDialogOptions({
      ...acceptInvitationDialogOptions,
      open: true,
      id: idInvitation,
    });
  };

  const onRejectHandler = (idInvitation) => {
    setRejectInvitationDialogOptions({
      ...rejectInvitationDialogOptions,
      open: true,
      id: idInvitation,
    });
  };

  const onAcceptInvitationDialogClosed = async (confirmed, idInvitation) => {
    if (confirmed) {
      const updatedInvitation = {
        idInvitation,
        isAccepted: true,

      };
      await Api.updateInvitation(updatedInvitation);

      setOpen(true);
      setInvitations(invitations.filter((invitation) => invitation.idInvitation !== idInvitation));
    }
    setAcceptInvitationDialogOptions({
      ...acceptInvitationDialogOptions,
      open: false,

    });
  };
  const onRejectInvitationDialogClosed = async (confirmed, idInvitation) => {
    if (confirmed) {
      const updatedInvitation = {
        idInvitation,
        isAccepted: false,
      };
      await Api.updateInvitation(updatedInvitation);

      setInvitations(invitations.filter((invitation) => invitation.idInvitation !== idInvitation));
    }
    setRejectInvitationDialogOptions({
      ...rejectInvitationDialogOptions,
      open: false,

    });
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <ConfirmDialog {...acceptInvitationDialogOptions} onDialogClosed={onAcceptInvitationDialogClosed} />
      <ConfirmDialog {...rejectInvitationDialogOptions} onDialogClosed={onRejectInvitationDialogClosed} />
      <Grid container spacing={4} justify="center">
        <Grid item xs={12}>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
          >
            <Alert onClose={handleCloseSnackBar} severity="success">
              You joined new project successfully!!
            </Alert>
          </Snackbar>
          {invitations.length > 0 ? (invitations.map((invitation) => (
            <InvitationCard invitation={invitation} onAcceptAction={() => onAcceptHandler(invitation.idInvitation)} onRejectAction={() => onRejectHandler(invitation.idInvitation)} />

          ))) : (
            <div>
              <Alert
                severity="warning"
                className={classes.alert}
              >
                Sorry! You have no invitations
              </Alert>
            </div>
          )}
        </Grid>

        {totalInvitation > 5 && (
          <Grid item xs={4}>
            <Button size="big" variant="contained" href="/invitations">See more</Button>
          </Grid>

        )}

      </Grid>

    </div>
  );
};

export default InvitationPopOver;
