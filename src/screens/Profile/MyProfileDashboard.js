import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid, Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import S3FileUpload from 'react-s3';
import MuiAlert from '@material-ui/lab/Alert';
import Header from '../shared/components/Header';
import Api from '../../api/index';
import MyProfile from './MyProfile';
import AllNotes from '../shared/components/AllNotes';
import S3config from '../../globals/S3Config';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const MyProfileDashboard = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { IdUser } = useParams();
  const [showEditButton, setShowEditButton] = useState(false);
  const [userProfile, setProfile] = useState();
  const [uploadUrl, setUploadUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isUpload, setIsUpload] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const isShowEditButton = () => {
    if (Api.getUserId() == IdUser) {
      setShowEditButton(true);
    }
  };

  const loadData = async () => {
    const res = await Promise.all([Api.getUserProfile(IdUser)]);
    setProfile(res[0].data.data);
    console.log(res[0].data.data);
    isShowEditButton();
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? 'simple-popover' : undefined;
  const uploadToBackend = async (s3url) => {
    const uploadBackend = Api.updateUserAvatar(Api.getUserId(), s3url)
      .then((response) => {
        setIsUpload(false);
        setSuccessMsg('New avatar has been successfully uploaded');
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setRefreshPage(true);
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setIsUpload(false);
        setErrorMsg(err.response.data);
      });
  };

  const onFileUpdate = async (e) => {
    setUploadUrl('');
    setIsUpload(true);
    S3FileUpload.uploadFile(e.target.files[0], S3config.config)
      .then((data) => {
        setUploadUrl(data.location);
        uploadToBackend(data.location);
      })
      .catch((err) => {
        setIsUpload(false);
        setErrorMsg(err.response.data);
      });
  };

  useEffect(async () => {
    loadData();
  }, []);

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <Header />
        <Grid item xs={2}>
          <AllNotes />
        </Grid>
        <Grid item xs={8}>
          <Snackbar
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            open={open}
            autoHideDuration={1000}
            onClose={handleCloseSnackBar}
          >
            <Alert onClose={handleCloseSnackBar} severity="success">
              {successMsg}
            </Alert>
          </Snackbar>
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          { userProfile
          && (
          <MyProfile
            showEditButton={showEditButton}
            profileInfo={userProfile}
            onFileUpdate={onFileUpdate}
            isDoneUpload={isUpload}
          />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfileDashboard;
