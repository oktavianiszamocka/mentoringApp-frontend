import axios from 'axios';

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

axios.interceptors.response.use((response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refresh_token');
      console.log('expired');
      originalRequest._retry = true;
      return axios.post(`${apiUrl}/account/${refreshToken}/refresh`)
        .then((res) => {
          if (res.status === 200) {
            // 1) put token to LocalStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('refresh_token', res.data.refreshToken);

            // 2) Change Authorization header
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    // return Error object with Promise
    return Promise.reject(error);
  });

const getUserId = () => 9;
// const getUserId = () => localStorage.getItem('idUser');

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
const getProjectMilestones = (idProject) => axios.get(`${apiUrl}/milestones/5`);
const updateMilestoneToPassed = (milestoneData) => axios.patch(`${apiUrl}/milestones/update-step`, milestoneData);
const addNewMilestone = (milestoneData) => axios.post(`${apiUrl}/milestones`, milestoneData);
const editMilestone = (milestoneData) => axios.patch(`${apiUrl}/milestones`, milestoneData);
const deleteTask = (idTask) => axios.delete(`${apiUrl}/tasks/${idTask}`);
const updateTaskStatus = (tasksData) => axios.patch(`${apiUrl}/tasks/update-status`, tasksData);
const getTasksStatuses = () => axios.get(`${apiUrl}/tasks/status`);
const getTasksAsignees = () => axios.get(`${apiUrl}/project-members/5`);
const createTask = (taskData) => axios.post(`${apiUrl}/tasks/`, taskData);
const updateTask = (taskData) => axios.patch(`${apiUrl}/tasks/`, taskData);
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


};
