export const ApiRoot = 'http://localhost:57864/api/';

const handleErrors = (err) => {
  if (err && err.response && err.response.status === 401) {
    // authStore.logout();
  }
  return err;
};

const responseBody = (res) => res.Body;

export const createRequest = (method, endpoint) => ({
  method,
  url: `${ApiRoot}${endpoint}`,
});
