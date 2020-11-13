import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

// TODO - just for development. Otherwise token should be received
// after login request.
// eslint-disable-next-line max-len
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFuMTIzIiwiVXNlcklkIjoiMSIsImV4cCI6MTkyMDI5MzcxNCwiaXNzIjoiQSIsImF1ZCI6IkIifQ.7IR6pXXjGJ64lHk5qLGL_utQEWsZQBpEGF_leGw3reA';

axios.defaults.headers.common.Authorization = apiToken;

const getUserId = () => 1;
const getNotes = () => axios.get(`${apiUrl}/personal-notes/${getUserId()}`);
const getPosts = () => axios.get(`${apiUrl}/posts`);

export default {
  getUserId,
  getNotes,
  getPosts,
};
