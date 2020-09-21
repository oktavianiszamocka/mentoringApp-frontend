import {observable} from 'mobx';

const authStore=observable({
  inProgress: false,
  errors: null
});

export default authStore;