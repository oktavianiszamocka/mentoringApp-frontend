import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Api from 'api';
import Header from '../shared/components/Header';
import Post from './Post';
import Note from '../shared/components/Note';
import Title from '../shared/components/Title';
import NoteForm from './NoteForm';
import UpsertPostForm from './Post/Form';

const StyledBox = styled(Box)({
  padding: '1.5rem',
  marginTop: '2rem',
  marginRight: '2rem',
  width: '12rem',
});

// const host = 'http://localhost:57864/api';
// const userId = 1;
// const getUser = () => axios.get('https://run.mocky.io/v3/2b2ecfa1-3095-4348-b16a-bb66dafc710c');
// const getNotes = () => axios.get(`${host}/personal-notes/${userId}`);
// const getPost = () => axios.get(`${host}/posts`);
// endpoint to get all comment
// eg. get all comment from post with id 1 = http://localhost:57864/api/posts/1/comment
// const postId = 1;
// const getComment = () => axios.get(`${host}/posts/${postId}/comment`);

const StudentDashboard = () => {
  const [notes, setNotes] = useState();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [showNewNote, setNewNote] = useState(false);

  const onNoteCloseHandler = (idNote) => {
    setNotes(notes.filter((n) => n.idNote !== idNote));
  };

  const onPostDeleteHandler = (idPost) => {
    setPosts(posts.filter((p) => p.idPost !== idPost));
  };

  const loadData = async () => {
    const res = await Promise.all([Api.getNotes()]);
    setNotes(res[0].data.data);
    // setUser(res[0].data);
    // setPosts(res[2].data.data);
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
        text: e.text,
        tags: tags.split(','),
      },
    ];
    setPosts(newPosts); // todo add elements
  };

  const handleNoteSubmit = (e) => {
    const newNotes = [
      {
        description: e.note,
        idNote: 20,
      },
      ...notes,
    ];

    setNotes(newNotes);
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        {Header()}
        <Grid item xs={2}>
          <StyledBox boxShadow="2px 1px 5px grey">
            <Title text="Notes" />
            {showNewNote && <NoteForm onSubmit={handleNoteSubmit} />}
            {notes
              && notes.map((item) => (
                <Note
                  idNote={item.idNote}
                  desc={item.description}
                  onCloseHandler={() => onNoteCloseHandler(item.idNote)}
                />
              ))}
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setNewNote(true)}
              style={{ marginTop: 10, marginLeft: 100 }}
            >
              Add Note
            </Button>
          </StyledBox>
        </Grid>
        <Grid item lg={8}>
          <UpsertPostForm onSubmit={handleSubmit} user={user} />

          {posts
            && posts.map((post) => (
              <Post
                postData={post}
                user={post.writer}
                onDeleteHandler={() => onPostDeleteHandler(post.idPost)}
              />
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentDashboard;
