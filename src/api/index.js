import axios from 'axios';
import moment from 'moment';

const apiUrl = 'http://localhost:57864/api';

// TODO - just for development. Otherwise token should be received
// after login request.
// eslint-disable-next-line max-len
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFuMTIzIiwiVXNlcklkIjoiMSIsImV4cCI6MTkyMDI5MzcxNCwiaXNzIjoiQSIsImF1ZCI6IkIifQ.7IR6pXXjGJ64lHk5qLGL_utQEWsZQBpEGF_leGw3reA';

axios.defaults.headers.common.Authorization = apiToken;

const getUserId = () => 9;
const getNotes = () => axios.get(`${apiUrl}/personal-notes/${getUserId()}`);
const getPosts = () => axios.get(`${apiUrl}/posts`);
const getUserAvaAndName = () => axios.get(`${apiUrl}/profiles/user/${getUserId()}`);
const getUserProfile = () => axios.get(`${apiUrl}/profiles/${getUserId()}`);
const postNote = (noteData) => axios.post(`${apiUrl}/personal-notes`, noteData);
const getPostComment = (idPost) => axios.get(`${apiUrl}/posts/${idPost}/comment`);

export default {
  getUserId,
  getNotes,
  getPosts,
  getUserProfile,
  getUserAvaAndName,
  postNote,
  getPostComment,
};
