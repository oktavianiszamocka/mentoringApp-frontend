import React from 'react';
import Header from '../shared/components/Header';
import Post from '../shared/components/Post';
import Note from '../shared/components/Note';
import Title from '../shared/components/Title';
import Avatar from '../shared/components/Avatar';
import AvatarImage from '../../assets/images/avatar.jpg';

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
    <div>
      {Header()}
      <Post
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis aliquam nisi, eget blandit sapien sagittis vitae. Vivamus eu accumsan quam, id lobortis lorem. Duis non finibus sem. Proin condimentum metus sit amet congue suscipit. Suspendisse tempus metus sit amet neque consequat volutpat sit amet in sem. Nam venenatis, est et maximus auctor, turpis elit tincidunt eros, ut mollis velit nibh quis sapien. Fusce vel turpis in est lacinia accumsan. Etiam a ultrices enim. Nunc at odio orci. Proin non dictum nisi. Integer scelerisque sagittis dolor, eget fermentum eros cursus sed. Nunc rhoncus posuere venenatis. Ut suscipit orci nec nisi tincidunt volutpat. Maecenas vestibulum a nisl ut bibendum. Praesent ullamcorper eros lacus, id eleifend urna mattis quis."
        user={user}
      ></Post>
      <Title text="Notes"></Title>
      <Note text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"></Note>
    </div>
  );
};

export default StudentDashboard;
