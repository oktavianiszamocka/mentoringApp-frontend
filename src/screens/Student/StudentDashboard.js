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

const host = 'http://localhost:57864/api';
const userId = 1;
const getUser = () => axios.get('https://run.mocky.io/v3/2b2ecfa1-3095-4348-b16a-bb66dafc710c');
const getNotes = () => axios.get(`${host}/personal-notes/${userId}`);
const getPost = () => axios.get(`${host}/posts`);
//endpoint to get all comment
// eg. get all comment from post with id 1 = http://localhost:57864/api/posts/1/comment
var postId = 1;
const getComment = () => axios.get(`${host}/posts/${postId}/comment`)


const StudentDashboard = () => {
  const [notes, setNotes] = useState();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  const onNoteCloseHandler = (idNote) => {
    setNotes(notes.filter((n) => n.IdNote != idNote));
  };

  const loadData = async () => {
    console.log('asdadasd');
    const res = await Promise.all([ getUser(), getNotes(), getPost()]);
    setUser(res[0].data);
    setNotes(res[1].data.data);
    setPosts(res[2].data.data);
  };

  console.log(posts);
  useEffect(async () => {
    loadData();
  }, []);

  const handleSubmit = (e) => {
    const { tags } = e;
    const newPosts = [
      ...posts,
      {
        title: e.title,
        text: e.text,
        tags: tags.split(','),
      },
    ];
    setPosts(newPosts); // todo add elements
  };



  return (
    <Grid container>
      {Header()}
      <Grid item xs={2}>
        <StyledBox boxShadow="2px 1px 5px grey">
          <Title text="Notes"></Title>
          {notes &&
            notes.map((item) => (
              <Note
                key={item.idNote}
                text={item.description}
                onCloseHandler={() => onNoteCloseHandler(item.IdNote)}
              />
            ))}
        </StyledBox>
      </Grid>
      <Grid item lg={8}>
        <UpsertPostForm onSubmit={handleSubmit} user={user} />
        {posts && posts.map((post) => <Post postData={post} user={post.writer} />)}
      </Grid>
    </Grid>
  );
};

export default StudentDashboard;
