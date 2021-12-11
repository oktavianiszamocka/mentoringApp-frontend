import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const UploadButton = (onFileUpdate, label) => (
  <div>
    <input
      accept="image/*"

      id="contained-button-file"
      type="file"
      onChange={onFileUpdate}
    />
    <label htmlFor="contained-button-file">
      <Button

        variant="contained"
        color="primary"
        component="span"
      >
        {label}
      </Button>
    </label>

  </div>
);

export default UploadButton;
