import {observable, action} from 'mobx';
import axios from 'axios';
import {createRequest} from 'src/api';
import authStore from './authStore';

const endpoints = {
  getEndpoint: (pageNum, pageSize)=> `posts?pageNumber=${pageNum}&pageSize=${pageSize}`
};

const commentsStore=observable({
  pageNumber: 1,
  pageSize: 10,
  posts: [],
  dataSth: "",
  getPosts: () => {
    authStore.inProgress=true;
    axios(createRequest("get", 
    endpoints.getEndpoint(commentsStore.pageNumber, commentsStore.pageSize)))
   .then((response)=>{
      commentsStore.posts=response.data;
      authStore.inProgress=false;
   })
   .catch((error)=>{
      console.log(error);
   });
  }
});

export default commentsStore;