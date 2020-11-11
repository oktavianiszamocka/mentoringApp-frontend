import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const ConfirmDialog = ({
  title, mainText, idNote, onDialogClosed, open,
}) => (
  <div>
    <Dialog
      open={open}
      onClose={() => onDialogClosed(false, idNote)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{mainText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDialogClosed(false, idNote)} color="primary">
          No
        </Button>
        <Button onClick={() => onDialogClosed(true, idNote)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  onDialogClosed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmDialog;
