import React, { useState, useEffect } from 'react';
import { Grid, Button, Snackbar } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import AllNotes from '../shared/components/AllNotes';
import ConfirmDialog from '../shared/components/ConfirmDialog';
import InvitationCard from './Invitation';

const useStyles = makeStyles({
  root: {
    marginTop: '6rem',

  },
  alert: {
    backgroundColor: 'rgba(255,165,0,0.2)',
    color: 'black',
    width: '280px',
    margin: '20px 30%',

  },
  paging: {
    marginTop: '1rem',
    marginLeft: '50%',
  },
});

const InvitationPage = () => {
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
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const loadData = async () => {
    const response = await Promise.all([Api.getFullInvitationOfUser(page)]);
    setInvitations(response[0].data.data);
    setCount(response[0].data.totalPages);
  };
  useEffect(() => {
    loadData();
  }, [page]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

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
    <div className={classes.root}>
      <ConfirmDialog {...acceptInvitationDialogOptions} onDialogClosed={onAcceptInvitationDialogClosed} />
      <ConfirmDialog {...rejectInvitationDialogOptions} onDialogClosed={onRejectInvitationDialogClosed} />
      <Grid container>
        <Header />
        <Grid item xs={3}>
          <AllNotes />
        </Grid>

        <Grid item xs={7}>
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
        <Grid item xs={12}>
          {invitations.length > 0 ? (
            <Pagination
              className={classes.paging}
              color="primary"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              onChange={handlePageChange}
            />
          ) : (<span />)}

        </Grid>

      </Grid>
    </div>
  );
};

export default InvitationPage;
