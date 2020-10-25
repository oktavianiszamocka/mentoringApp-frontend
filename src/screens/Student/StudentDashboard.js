import React, { useState, useEffect } from 'react';
import Header from '../shared/components/Header';
import Post from './Post';
import Note from '../shared/components/Note';
import Title from '../shared/components/Title';
// import AvatarImage from '../../assets/images/avatar.jpg';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import axios from 'axios';

import UpsertPostForm from './Post/Form';

const StyledBox = styled(Box)({
  padding: '1.5rem',
  marginTop: '2rem',
  marginRight: '2rem',
  width: '12rem',
});

// // https://run.mocky.io/v3/d5225f80-7266-4c5d-b049-af5dde2d3173
// const user = {
//   firstName: 'Jan',
//   lastName: 'Kowalsi',
//   imageUrl: AvatarImage.toString(),
// };

// // https://run.mocky.io/v3/0ce68445-ead3-4c96-8104-2f30598c05fa
// const notesList = [
//   { idNote: 1, text: 'Lorem ipsum' },
//   { idNote: 2, text: 'Ala ma kota' },
//   { idNote: 3, text: 'Something else...' },
// ];

// // https://run.mocky.io/v3/32142482-e677-4219-b4d3-ab04b4292924
// const tags = {
//   tagName1: 'Java',
//   tagName2: 'Backend',
//   tagName3: '.NET Core',
//   tagName4: 'React',
//   tagName5: 'Frontend',
//   tagName6: 'C++',
// };

const getUser = () => axios.get('https://run.mocky.io/v3/2b2ecfa1-3095-4348-b16a-bb66dafc710c');
const getNotes = () => axios.get('https://run.mocky.io/v3/2f01d5f2-21e3-40fe-86fd-a9ccecd078d1');
const getPost = () => axios.get('https://run.mocky.io/v3/0accdcfe-fbf9-46c2-a0ff-69605bb9d213');

const StudentDashboard = () => {
  const [notes, setNotes] = useState();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  const onNoteCloseHandler = (idNote) => {
    setNotes(notes.filter((n) => n.IdNote != idNote));
  };

  const onPostDeleteHandler = (idPost) => {
    setPosts(posts.filter((p) => p.IdPost != idPost));
  };

  const loadData = async () => {
    console.log('asdadasd');
    const res = await Promise.all([getUser(), getNotes(), getPost()]);
    setUser(res[0].data);
    setNotes(res[1].data);
    setPosts(res[2].data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  const handleSubmit = (e) => {
    const { tags } = e;
    const newPosts = [
      ...posts,
      {
        title: e.title,
        subtitle: e.subtitle,
        text: e.text,
        tags: tags.split(','),
      },
    ];
    setPosts(newPosts); // todo add elements
  };

  console.log('posts', posts);

  return (
    <Grid container>
      {Header()}
      <Grid item xs={2}>
        <StyledBox boxShadow="2px 1px 5px grey">
          <Title text="Notes"></Title>
          {notes &&
            notes.map((item) => (
              <Note
                key={item.IdNote}
                {...item}
                onCloseHandler={() => onNoteCloseHandler(item.IdNote)}
              />
            ))}
        </StyledBox>
      </Grid>
      <Grid item lg={8}>
        <UpsertPostForm onSubmit={handleSubmit} user={user} />
        {posts && posts.map((post) => <Post idPost={post.idPost} postData={post} user={user} onDeleteHandler={() => onPostDeleteHandler(post.IdPost)} />)}
      </Grid>
    </Grid>
  );
};

export default StudentDashboard;
