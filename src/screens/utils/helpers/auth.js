import { sharedRoutes } from '../User/shared/routes'
import { loggedInRoutes } from '../User/LoggedIn/routes'
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isAuthenticated, getRoles } from '../ducks/auth/selectors';



export const requireAuth = (ComposedComponent, requiredRoles) => {
  const Authentication = ({ ...props }) => {
    const authenticated = useSelector(isAuthenticated);
    const roles = useSelector(getRoles);

    if (authenticated && roles.some(role => requiredRoles.includes(role)))
      return <ComposedComponent {...props} />;

    return <Redirect to="/login" />;
  };

  return Authentication;
};

