import axios from 'axios';
import moment from 'moment';

const apiUrl = 'http://localhost:57864/api';

// TODO - just for development. Otherwise token should be received
// after login request.
// eslint-disable-next-line max-len
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFuMTIzIiwiVXNlcklkIjoiMSIsImV4cCI6MTkyMDI5MzcxNCwiaXNzIjoiQSIsImF1ZCI6IkIifQ.7IR6pXXjGJ64lHk5qLGL_utQEWsZQBpEGF_leGw3reA';

axios.defaults.headers.common.Authorization = apiToken;
const getUserId = () => 9;
const getNotes = (pageNumber) => axios.get(`${apiUrl}/personal-notes/${getUserId()}?pageNumber=${pageNumber}&pageSize=3`);
const getPosts = (pageNumber) => axios.get(`${apiUrl}/posts?pageNumber=${pageNumber}&pageSize=10`);
const getGeneralPosts = (pageNumber) => axios.get(`${apiUrl}/posts/general?pageNumber=${pageNumber}&pageSize=10`);
const getProjectPosts = (pageNumber, idProject) => axios.get(`${apiUrl}/posts/project/${idProject}?pageNumber=${pageNumber}&pageSize=10`);
// http://localhost:57864/api/posts?pageNumber=2&pageSize=3
const getUserAvaAndName = () => axios.get(`${apiUrl}/profiles/user/${getUserId()}`);
const getProjectDetails = (idProject) => axios.get(`${apiUrl}/projects/project-info/${idProject}`);
const getUserProfile = (idUser) => axios.get(`${apiUrl}/profiles/${idUser}`);
const postNote = (noteData) => axios.post(`${apiUrl}/personal-notes`, noteData);
const getPostComment = (idPost) => axios.get(`${apiUrl}/posts/${idPost}/comment`);
const sendPostComment = (commentData) => axios.post(`${apiUrl}/posts/comment`, commentData);
const editPostComment = (commentData) => axios.patch(`${apiUrl}/posts/comment`, commentData);
const deletePostComment = (idComment) => axios.delete(`${apiUrl}/posts/comment/${idComment}`);
const deleteNote = (idNote) => axios.delete(`${apiUrl}/personal-notes/${idNote}`);
const updateNote = (noteData) => axios.patch(`${apiUrl}/personal-notes`, noteData);
const getUserProject = () => axios.get(`${apiUrl}/projects/${getUserId()}`);
const postNewPost = (postData) => axios.post(`${apiUrl}/posts`, postData);
const deletePost = (idPost) => axios.delete(`${apiUrl}/posts/${idPost}`);
const updatePost = (postData) => axios.patch(`${apiUrl}/posts`, postData);
const updateProfileData = (profileData) => axios.patch(`${apiUrl}/profiles`, profileData);
const getMyProject = (pageNumber) => axios.get(`${apiUrl}/projects/user-projects/${getUserId()}?pageNumber=${pageNumber}&pageSize=5`);
const getMyProjectBySearch = (searchString, pageNumber) => axios.get(`${apiUrl}/projects/user-projects/${getUserId()}/search?projectName=${searchString}&pageNumber=${pageNumber}&pageSize=5`);
const getProjectMembers = (idProject) => axios.get(`${apiUrl}/project-members/${idProject}`);
const getProjectPromoters = (idProject) => axios.get(`${apiUrl}/project-promoters/${idProject}`);
const getProjectStatus = () => axios.get(`${apiUrl}/projects/status`);

export default {
  getUserId,
  getNotes,
  getPosts,
  getUserProfile,
  getUserAvaAndName,
  postNote,
  getPostComment,
  sendPostComment,
  editPostComment,
  deletePostComment,
  deleteNote,
  updateNote,
  getUserProject,
  getGeneralPosts,
  getProjectPosts,
  postNewPost,
  deletePost,
  updatePost,
  updateProfileData,
  getMyProject,
  getMyProjectBySearch,
  getProjectMembers,
  getProjectDetails,
  getProjectPromoters,
  getProjectStatus,
};
