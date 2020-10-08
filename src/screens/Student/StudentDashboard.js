import React from 'react';
import Header from '../shared/components/Header';
import Post from '../shared/components/Post';
import Note from '../shared/components/Note';
import Title from '../shared/components/Title';
import AvatarImage from '../../assets/images/avatar.jpg';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import '../../index.css';

const StudentDashboard = () => {
  const user = {
    firstName: 'Jan',
    lastName: 'Kowalsi',
    imageUrl: AvatarImage.toString(),
  };

  const NoteTitleStyle = {
    fontColor: 'palevioletred',
  };

  return (
    <Grid container>
      {Header()}
      <Grid item xs={2}>
        <Box boxShadow="2px 1px 5px grey" padding="1.5rem">
          <Title text="Notes"></Title>
          <Note text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"></Note>
          <Note text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"></Note>
        </Box>
      </Grid>
      <Grid item lg={8}>
        <Post
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis aliquam nisi, eget blandit sapien sagittis vitae. Vivamus eu accumsan quam, id lobortis lorem. Duis non finibus sem. Proin condimentum metus sit amet congue suscipit. Suspendisse tempus metus sit amet neque consequat volutpat sit amet in sem. Nam venenatis, est et maximus auctor, turpis elit tincidunt eros, ut mollis velit nibh quis sapien. Fusce vel turpis in est lacinia accumsan. Etiam a ultrices enim. Nunc at odio orci. Proin non dictum nisi. Integer scelerisque sagittis dolor, eget fermentum eros cursus sed. Nunc rhoncus posuere venenatis. Ut suscipit orci nec nisi tincidunt volutpat. Maecenas vestibulum a nisl ut bibendum. Praesent ullamcorper eros lacus, id eleifend urna mattis quis."
          user={user}
        ></Post>
      </Grid>
    </Grid>
  );
};

export default StudentDashboard;
