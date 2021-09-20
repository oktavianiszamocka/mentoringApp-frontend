import React from 'react';
import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'mentoring-app-avatars',
  dirName: 'user-avatar',
  region: 'eu-central-1',
  accessKeyId: process.env.REACT_APP_S3_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRETKEY,
};

export default {
  config,
};
