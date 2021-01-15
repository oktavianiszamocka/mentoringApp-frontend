import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import CreatePostForm from './FormwithFormik';
import Api from '../../../api/index';

const EditPostDialog = ({
  EditPost, user, id, onDialogClosed, open, handleSubmit,
}) => (
  <div>
    <Dialog
      fullWidth="true"
      maxWidth="md"
      open={open}
      onClose={() => onDialogClosed(false, id)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Post</DialogTitle>
      <DialogContent>
        <CreatePostForm
          initialValues={EditPost}
          formSumbitCallback={handleSubmit}
          user={user}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDialogClosed(false, id)} color="primary">
          Cancel
        </Button>

      </DialogActions>
    </Dialog>
  </div>
);
EditPostDialog.propTypes = {

  onDialogClosed: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default EditPostDialog;
