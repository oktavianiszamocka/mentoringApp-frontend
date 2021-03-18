import React, { useState, useEffect } from 'react';
import {
  Grid, Button, InputLabel, Select, MenuItem, FormControl, FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmDialog from 'screens/shared/components/ConfirmDialog';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import Api from '../../api/index';
import Header from '../shared/components/Header';
import Post from './Post';
import CreatePostForm from './Post/FormwithFormik';
import EditPostDialog from './Post/EditPostDialog';
import AllNotes from '../shared/components/AllNotes';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '6rem',
  },

  selectProject: {
    width: '300',
  },
  formControl: {
    display: 'block',
    marginLeft: '15rem',
    minWidth: 120,
    width: '50%',
  },

}));

const StudentDashboard = () => {
  const classes = useStyles();
  const defaultInitialValuePost = {
    idPost: '',
    title: '',
    content: '',
    tags: [],
  };

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

  const [user, setUser] = useState({ });
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [project, setProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [newPost, setNewPost] = useState(defaultInitialValuePost);

  const loadData = async () => {
    const postType = project === 'General' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
    const res = await Promise.all([postType, Api.getUserProject(), Api.getUserAvaAndName()]);
    setPosts(res[0].data.data);
    setCount(res[0].data.totalPages);
    setProjects(res[1].data.data);
    setUser(res[2].data.data);
  };

  useEffect(() => {
    loadData();
  }, [page, projects]);

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

      const postType = project === 'General' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
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
    const postType = project === 'General' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
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
    const postType = project === 'General' ? Api.getGeneralPosts(page) : Api.getProjectPosts(page, project);
    const refreshedPosts = await postType;
    setPosts(refreshedPosts.data.data);
    setNewPost(e);
    setNewPost(defaultInitialValuePost);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleChange = (event) => {
    setProject(event.target.value);
  };
  return (
    <div className={classes.root}>
      <ConfirmDialog {...deletePostDialogOptions} onDialogClosed={onPostDeleteDialogClosed} />
      <EditPostDialog {...editPostDialogOptions} onDialogClosed={onPostEditDialogClosed} handleSubmit={onPostEditSubmit} />
      <Grid
        container
        spacing={2}
        justify="center"
      >
        {Header()}
        <Grid
          item
          lg={2}
          md={3}
          s={12}
        >
          <AllNotes />
        </Grid>
        <Grid item lg={10} md={10} s={12} xs={12}>

          <FormControl className={classes.formControl}>
            <InputLabel id="project-label" className={classes.selectProject}>Project</InputLabel>
            <Select
              fullWidth
              labelId="project-label"
              id="project-select"
              value={project}
              onChange={handleChange}
              className={classes.selectProject}
            >
              <MenuItem value="General">General </MenuItem>
              {projects && projects.map((pro) => (
                <MenuItem value={pro.idProject}>
                  {pro.name}
                  {' '}
                </MenuItem>
              ))}

            </Select>
            <FormHelperText>Choose Posts from General topic or Posts from Specific Project</FormHelperText>

          </FormControl>

          <CreatePostForm
            initialValues={newPost}
            formSumbitCallback={handleSubmit}
            user={user}

          />

          {posts.length > 0 ? (
            posts.map((post) => (
              <Grid item lg={12} m={12} s={12} xs={12}>
                <Post
                  postData={post}
                  user={post.writer}
                  onDeleteHandler={() => onPostDeleteHandler(post.idPost)}
                  onEditHandler={() => onPostEditHandler(post.idPost, post.title, post.content, post.tags, post.writer)}
                  currentUser={user}
                />
              </Grid>
            ))) : (
              <div>
                <Alert
                  severity="warning"
                  style={{
                    backgroundColor: 'rgba(255,165,0,0.2)', color: 'black', width: '280px', margin: '20px 30%',
                  }}
                >
                  There are no posts available
                </Alert>
              </div>

          )}

          {posts.length > 0 ? (
            <Pagination
              color="primary"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              onChange={handlePageChange}
            />
          ) : (<div />)}

        </Grid>

      </Grid>
    </div>
  );
};

export default StudentDashboard;
