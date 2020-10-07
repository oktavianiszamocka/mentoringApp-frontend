import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../shared/components/Header';
import MessageForm from '../shared/components/MessageForm';

const StudentMessage = () => {
  return (
    <div>
      {Header()}
      {MessageForm()}
    </div>
  );
};

export default StudentMessage;
