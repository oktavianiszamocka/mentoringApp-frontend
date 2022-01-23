import axios from 'axios';
import UseToken from 'screens/UseToken';
import React, { useState, useEffect } from 'react';

const apiUrl = 'http://localhost:57864/api';

// TODO - just for development. Otherwise token should be received
// after login request.
// eslint-disable-next-line max-len

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

let isRefresh = false;
axios.interceptors.response.use((response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry && !isRefresh) {
      isRefresh = true;
      const refreshToken = localStorage.getItem('refresh_token');
      originalRequest._retry = true;
      return axios.post(`${apiUrl}/account/${refreshToken}/refresh`)
        .then((res) => {
          if (res.status === 200) {
            // 1) put token to LocalStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('refresh_token', res.data.refreshToken);
            isRefresh = false;

            // 2) Change Authorization header
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          localStorage.removeItem('token');
          window.location.href = '/login';
        });
    }

    // return Error object with Promise
    return Promise.reject(error);
  });

// const getUserId = () => 9;
const getUserRole = () => localStorage.getItem('userRole');
const isMentor = () => getUserRole() == 3;

const getUserId = () => localStorage.getItem('idUser');

const getNotes = (pageNumber) => axios.get(`${apiUrl}/personal-notes/${getUserId()}?pageNumber=${pageNumber}&pageSize=3`);
const getPosts = (pageNumber) => axios.get(`${apiUrl}/posts?pageNumber=${pageNumber}&pageSize=10`);
const getGeneralPosts = (pageNumber) => axios.get(`${apiUrl}/posts/general?pageNumber=${pageNumber}&pageSize=10`);
const getProjectPosts = (pageNumber, idProject) => axios.get(`${apiUrl}/posts/project/${idProject}?pageNumber=${pageNumber}&pageSize=10`);
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
const getMyProjectBySearch = (additionalSearchUrl, pageNumber) => axios.get(`${apiUrl}/projects/user-projects/${getUserId()}/search?${additionalSearchUrl}pageNumber=${pageNumber}&pageSize=5`);
const getProjectMembers = (idProject) => axios.get(`${apiUrl}/project-members/${idProject}`);
const getProjectPromoters = (idProject) => axios.get(`${apiUrl}/project-promoters/${idProject}`);
const getProjectStatus = () => axios.get(`${apiUrl}/projects/status`);
const postNewProject = (newProject) => axios.post(`${apiUrl}/projects`, newProject);
const getInvitationOfUser = () => axios.get(`${apiUrl}/invitations/${getUserId()}`);
const updateInvitation = (updatedInvitation) => axios.patch(`${apiUrl}/invitations`, updatedInvitation);
const getFullInvitationOfUser = (pageNumber) => axios.get(`${apiUrl}/invitations/${getUserId()}?pageNumber=${pageNumber}&pageSize=5`);
const postNewSupervisors = (newSupervisors) => axios.post(`${apiUrl}/project-promoters`, newSupervisors);
const postNewMembers = (newMembers) => axios.post(`${apiUrl}/project-members`, newMembers);
const getRoleMembers = () => axios.get(`${apiUrl}/project-members/roles`);
const getProjectTasks = (idProject) => axios.get(`${apiUrl}/tasks/${idProject}`);
const login = (logininfo) => axios.post(`${apiUrl}/account/login`, logininfo);
const register = (registerinfo) => axios.post(`${apiUrl}/account/register`, registerinfo);
const getTaskDetails = (idTask) => axios.get(`${apiUrl}/tasks/detail/${idTask}`);
const getProjectMilestones = (idProject) => axios.get(`${apiUrl}/milestones/${idProject}`);
const updateMilestoneToPassed = (milestoneData) => axios.patch(`${apiUrl}/milestones/update-step`, milestoneData);
const addNewMilestone = (milestoneData) => axios.post(`${apiUrl}/milestones`, milestoneData);
const editMilestone = (milestoneData) => axios.patch(`${apiUrl}/milestones`, milestoneData);
const deleteTask = (idTask) => axios.delete(`${apiUrl}/tasks/${idTask}`);
const updateTaskStatus = (tasksData) => axios.patch(`${apiUrl}/tasks/update-status`, tasksData);
const getTasksStatuses = () => axios.get(`${apiUrl}/tasks/status`);
const getTasksAsignees = (idProject) => axios.get(`${apiUrl}/project-members/${idProject}`);
const createTask = (taskData) => axios.post(`${apiUrl}/tasks/`, taskData);
const updateTask = (taskData) => axios.patch(`${apiUrl}/tasks/`, taskData);
const getUserMeetings = (userId, date) => axios.get(`${apiUrl}/meetings/user/${userId}?date=${date}`);
const deleteMeeting = (idMeeting) => axios.delete(`${apiUrl}/meetings/${idMeeting}`);
const addMeeting = (meetingData) => axios.post(`${apiUrl}/meetings`, meetingData);
const getMeetingDetail = (meetingId) => axios.get(`${apiUrl}/meetings/${meetingId}`);
const updateMeeting = (meetingData) => axios.patch(`${apiUrl}/meetings/`, meetingData);
const updateMeetingAttendance = (newData) => axios.patch(`${apiUrl}/meetings/attendee/update-status`, newData);
const editProjectInfo = (projectInfo) => axios.patch(`${apiUrl}/projects/`, projectInfo);
const getProjectPromoterEmails = (idProject) => axios.get(`${apiUrl}/project-promoters/${idProject}/email`);
const updateProjectPromoter = (editProjectPromoter) => axios.patch(`${apiUrl}/project-promoters/`, editProjectPromoter);
const deleteProjectMember = (idProjectMember) => axios.delete(`${apiUrl}/project-members/${idProjectMember}`);
const updateProjectMember = (editProjectMember) => axios.patch(`${apiUrl}/project-members/`, editProjectMember);
const getProjectMemberInvitation = (idProject) => axios.get(`${apiUrl}/invitations/member/${idProject}`);
const getProjectPromotorInvitation = (idProject) => axios.get(`${apiUrl}/invitations/promotor/${idProject}`);
const deleteProjectPromotor = (idProject, emailUser) => axios.delete(`${apiUrl}/project-promoters/${idProject}?email=${emailUser}`);
const updateUserAvatar = (idUser, pictureUrl) => axios.patch(`${apiUrl}/account/avatar?user=${idUser}&url=${pictureUrl}`);
const changePassword = (passwordData) => axios.post(`${apiUrl}/account/changePassword`, passwordData);
const getProjectStudies = () => axios.get(`${apiUrl}/projects/studies`);
const getProjectModes = () => axios.get(`${apiUrl}/projects/mode`);
const getAllMessages = () => axios.get(`${apiUrl}/messages/${getUserId()}`);
const messageSearch = (string) => axios.get(`${apiUrl}/messages/receiverList?search=${string}`);
const getDetailMessages = (senderId, recieverId) => axios.get(`${apiUrl}/messages/detail?sender=${senderId}&receiver=${recieverId}&current-user=${getUserId()}`);
const sendMessage = (messageData) => axios.post(`${apiUrl}/messages`, messageData);
const postProjectIconUrl = (idProject, urlIcon) => axios.patch(`${apiUrl}/projects/project-icon?project=${idProject}&icon=${urlIcon}`);
const getProjectUrlTypes = () => axios.get(`${apiUrl}/projects/url-types`);
const postProjectUrls = (links) => axios.patch(`${apiUrl}/projects/project-urls`, links);
const forgotPassword = (email) => axios.post(`${apiUrl}/account/sendReset`, email);
const resetPassword = (data) => axios.post(`${apiUrl}/account/resetPassword`, data);
const getMeetingNotes = (meetingId) => axios.get(`${apiUrl}/meeting-notes/${meetingId}`);
const addMeetingNote = (noteData) => axios.post(`${apiUrl}/meeting-notes`, noteData);
const deleteMeetingNote = (idNote) => axios.delete(`${apiUrl}/meeting-notes/${idNote}`);
const deleteProject = (idProject) => axios.delete(`${apiUrl}/projects/${idProject}`);
const getProjectMeetings = (idProject, date) => axios.get(`${apiUrl}/meetings/project/${idProject}?date=${date}`);

export default {
  getUserId,
  getUserRole,
  isMentor,
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
  postNewProject,
  getInvitationOfUser,
  updateInvitation,
  getFullInvitationOfUser,
  postNewSupervisors,
  postNewMembers,
  getRoleMembers,
  getProjectTasks,
  login,
  register,
  getTaskDetails,
  getProjectMilestones,
  updateMilestoneToPassed,
  addNewMilestone,
  editMilestone,
  deleteTask,
  updateTaskStatus,
  getTasksStatuses,
  getTasksAsignees,
  createTask,
  updateTask,
  getUserMeetings,
  deleteMeeting,
  addMeeting,
  getMeetingDetail,
  updateMeeting,
  updateMeetingAttendance,
  editProjectInfo,
  getProjectPromoterEmails,
  updateProjectPromoter,
  deleteProjectMember,
  updateProjectMember,
  getProjectMemberInvitation,
  getProjectPromotorInvitation,
  deleteProjectPromotor,
  updateUserAvatar,
  changePassword,
  getProjectStudies,
  getProjectModes,
  getAllMessages,
  getDetailMessages,
  sendMessage,
  postProjectIconUrl,
  getProjectUrlTypes,
  postProjectUrls,
  messageSearch,
  forgotPassword,
  resetPassword,
  getMeetingNotes,
  deleteProject,
  addMeetingNote,
  deleteMeetingNote,
  getProjectMeetings,
};
