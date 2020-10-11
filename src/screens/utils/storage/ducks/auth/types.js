import { createTypes, requestLifecycle } from '../../../helpers/types';

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const LOGIN = createTypes('auth/login', 'LOGIN', requestLifecycle);
export const REFRESH_TOKEN = createTypes(
  'auth/refresh-token',
  'REFRESH_TOKEN',
  requestLifecycle
);
export const REGISTER = createTypes(
  'auth/register',
  'REGISTER',
  requestLifecycle
);
export const RESET_PASSWORD = createTypes(
  'auth/reset-password',
  'RESET_PASSWORD',
  requestLifecycle
);
