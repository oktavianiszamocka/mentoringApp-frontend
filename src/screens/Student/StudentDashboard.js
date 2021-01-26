import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ConfirmDialog from 'screens/shared/components/ConfirmDialog';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Api from '../../api/index';
import Header from '../shared/components/Header';
import Post from './Post';
import Note from '../shared/components/Note';
import Title from '../shared/components/Title';
import NoteForm from './NoteForm';
import CreatePostForm from './Post/FormwithFormik';
import EditPostDialog from './Post/EditPostDialog';

const StyledBox = styled(Box)({
  padding: '1.5rem',
  marginTop: '2rem',
  marginRight: '2rem',
  width: '12rem',
  boxShadow: '1px 1px 2px grey',
});

const StudentDashboard = () => {
  const defaultInitialValueNote = {
    idNote: '',
    description: '',
  };
  const defaultInitialValuePost = {
    idPost: '',
    title: '',
    content: '',
    tags: [],
  };
  const [deleteNoteDialogOptions, setDeleteNoteDialogOptions] = useState({
    title: 'Delete note',
    mainText: 'Are you sure you want to delete this note?',
    id: null,
    open: false,
  });
  const [deletePostDialogOptions, setDeletePostDialogOptions] = useState({
    title: 'Delete Post',
    mainText: 'Are you sure you want to delete this post?',
    id: null,
    open: false,
  });

  const [editPostDialogOptions, setEditPostDialogOptions] = useState({
    id: null,
    open: false,
    user: null,
    EditPost: null,
  });

  const [notes, setNotes] = useState([]);

  const [user, setUser] = useState({ });
  const [posts, setPosts] = useState([]);
  const [newNoteVisible, setNewNoteVisible] = useState(false);
  const [onUpdateAction, setUpdateAction] = useState(false);
  const [updateNoteInitialValue, setUpdateNoteInitialValue] = useState(defaultInitialValueNote);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageNote, setPageNote] = useState(1);
  const [countNote, setCountNote] = useState(0);
  const [project, setProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [newPost, setNewPost] = useState(defaultInitialValuePost);

  const loadData = async () => {
    const postType = project === '' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
    const res = await Promise.all([Api.getNotes(pageNote), postType, Api.getUserProject(), Api.getUserAvaAndName()]);
    setNotes(res[0].data.data);
    setCountNote(res[0].data.totalPages);
    setPosts(res[1].data.data);
    setCount(res[1].data.totalPages);
    setProjects(res[2].data.data);
    setUser(res[3].data.data);
  };

  useEffect(() => {
    loadData();
  }, [page, projects]);

  const handleNotePostSubmit = async (e) => {
    const noteData = {
      Description: e.note,
      User: Api.getUserId(),
      CreatedOn: moment(),
      LastModified: moment(),

    };
    const newNote = await Api.postNote(noteData)
      .then((response) => response.data);
    const getNotes = await Api.getNotes(pageNote)
      .then((response) => response.data);
    setNotes(getNotes.data);
    setNewNoteVisible(false);
  };

  const handleNoteUpdateSubmit = async (e) => {
    const noteData = {
      idNote: updateNoteInitialValue.idNote,
      Description: e.note,
      User: Api.getUserId(),
      LastModified: moment(),
    };
    const newNote = await Api.updateNote(noteData)
      .then((response) => response.data);
    const newNotes = [
      {
        description: newNote.description,
        idNote: newNote.idNote,
      },
      ...notes,
    ];

    setNotes(newNotes);
    setNewNoteVisible(false);
    setUpdateAction(false);
    setUpdateNoteInitialValue(defaultInitialValueNote);
  };

  const onNoteUpdateHandler = (id, desc) => {
    const noteData = {
      idNote: id,
      description: desc,
    };
    setUpdateAction(true);
    setUpdateNoteInitialValue(noteData);
    setNewNoteVisible(true);
    setNotes(notes.filter((n) => n.idNote !== id));
  };

  const onNoteCloseHandler = (id) => {
    setDeleteNoteDialogOptions({
      ...deleteNoteDialogOptions,
      open: true,
      id,
    });
  };

  const onNoteDeleteDialogClosed = async (confirmed, idNote) => {
    if (confirmed) {
      await Api.deleteNote(idNote);
      const response = await Api.getNotes(pageNote);
      setNotes(response.data.data);
    }

    setDeleteNoteDialogOptions({
      ...deleteNoteDialogOptions,
      open: false,
    });
  };

  const onPostDeleteHandler = (id) => {
    setDeletePostDialogOptions({
      ...deletePostDialogOptions,
      open: true,
      id,
    });
  };

  const onPostDeleteDialogClosed = async (confirmed, idPost) => {
    if (confirmed) {
      await Api.deletePost(idPost);

      const postType = project === '' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
      const refreshedPosts = await postType;

      setPosts(refreshedPosts.data.data);
    }

    setDeletePostDialogOptions({
      ...deletePostDialogOptions,
      open: false,
    });
  };

  const onPostEditDialogClosed = async (confirmed, idPost) => {
    setEditPostDialogOptions({
      ...editPostDialogOptions,
      open: false,
    });
  };

  const onPostEditHandler = (id, title, content, tags, userPost) => {
    const initialEditPOst = {
      idPost: id,
      title,
      content,
      tags,
    };
    setNewPost(initialEditPOst);
    setEditPostDialogOptions({
      open: true,
      id,
      EditPost: {
        title,
        content,
        tags,
      },
      user: userPost,
    });
  };

  const onPostEditSubmit = async (e) => {
    const editPostDTO = {
      idPost: newPost.idPost,
      title: e.title,
      content: e.content,
      Tags: e.tags,
    };

    const updatedPost = await Api.updatePost(editPostDTO)
      .then((response) => response.data);
    const postType = project === '' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
    const refreshedPosts = await postType;
    setPosts(refreshedPosts.data.data);
    setNewPost(defaultInitialValuePost);
    setEditPostDialogOptions({
      ...editPostDialogOptions,
      open: false,
    });
  };

  const handleSubmit = async (e) => {
    const newPostDTO = {
      title: e.title,
      content: e.content,
      DateOfPublication: moment().toJSON(),
      Writer: Api.getUserId(),
      Project: project === '' ? null : project,
      Tags: e.tags,
    };

    const postedPost = await Api.postNewPost(newPostDTO)
      .then((response) => response.data);
    const postType = project === '' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
    const refreshedPosts = await postType;
    setPosts(refreshedPosts.data.data);
    setNewPost(e);
    setNewPost(defaultInitialValuePost);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handlePageNoteChange = async (e, value) => {
    setPageNote(value);
    const getNotes = await Api.getNotes(pageNote)
      .then((response) => response.data);
    setNotes(getNotes.data);
  };
  const handleChange = (event) => {
    setProject(event.target.value);
  };
  return (
    <div style={{ marginTop: '6rem' }}>
      <ConfirmDialog {...deleteNoteDialogOptions} onDialogClosed={onNoteDeleteDialogClosed} />
      <ConfirmDialog {...deletePostDialogOptions} onDialogClosed={onPostDeleteDialogClosed} />
      <EditPostDialog {...editPostDialogOptions} onDialogClosed={onPostEditDialogClosed} handleSubmit={onPostEditSubmit} />
      <Grid container>
        {Header()}
        <Grid item xs={2}>
          <StyledBox>
            <Title text="Notes" />
            {newNoteVisible && (
            <NoteForm
              onSubmit={onUpdateAction ? handleNoteUpdateSubmit : handleNotePostSubmit}
              initialValue={updateNoteInitialValue.description}
            />
            )}

            {notes
              && notes.map((item) => (
                <Note
                  idNote={item.idNote}
                  desc={item.description}
                  onCloseHandler={() => onNoteCloseHandler(item.idNote)}
                  onUpdateHandler={() => onNoteUpdateHandler(item.idNote, item.description)}
                />

              ))}

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setNewNoteVisible(true)}
              style={{ marginTop: 10, marginLeft: 100 }}
            >
              Add Note
            </Button>
            <Pagination
              color="primary"
              count={countNote}
              page={pageNote}
              siblingCount={1}
              boundaryCount={1}
              onChange={handlePageNoteChange}
            />
          </StyledBox>
        </Grid>
        <Grid item lg={8}>

          <CreatePostForm
            initialValues={newPost}
            formSumbitCallback={handleSubmit}
            user={user}

          />
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            onChange={handleChange}
          >
            <MenuItem value="">General </MenuItem>
            {projects && projects.map((pro) => (
              <MenuItem value={pro.idProject}>
                {pro.name}
                {' '}
              </MenuItem>
            ))}

          </Select>

          {posts
            && posts.map((post) => (
              <Post
                postData={post}
                user={post.writer}
                onDeleteHandler={() => onPostDeleteHandler(post.idPost)}
                onEditHandler={() => onPostEditHandler(post.idPost, post.title, post.content, post.tags, post.writer)}
                currentUser={user}

              />
            ))}
          <Pagination
            color="primary"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            onChange={handlePageChange}
          />
        </Grid>

      </Grid>
    </div>
  );
};

export default StudentDashboard;
