import { useState } from 'react';

export default function UseToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = tokenString;
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const getRefreshToken = () => {
    const refreshTokenString = localStorage.getItem('refresh_token');
    return refreshTokenString;
  };

  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  const saveRefreshToken = (userRefreshToken) => {
    localStorage.setItem('refresh_token', userRefreshToken);
    setRefreshToken(userRefreshToken);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('idUser');
  };

  const getIdUser = () => localStorage.getItem('idUser');
  const [idUser, setIdUser] = useState(getIdUser());

  const saveIdUser = (idUser) => {
    localStorage.setItem('idUser', idUser);
    setIdUser(idUser);
  };

  const getUserRole = () => localStorage.getItem('userRole');
  const [userRole, setUserRole] = useState(getUserRole());

  const saveUserRole = (userRole) => {
    localStorage.setItem('userRole', userRole);
    setUserRole(userRole);
  };

  return {
    setToken: saveToken,
    token,
    setRefreshToken: saveRefreshToken,
    refreshToken,
    clearToken,
    idUser,
    setIdUser: saveIdUser,
    userRole,
    setUserRole: saveUserRole,
    getUserRole,

  };
}
