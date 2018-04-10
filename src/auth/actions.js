import {
  AUTH_AUTHENTICATE,
  AUTH_SET_AUTHENTICATION,
  AUTH_USER_RETRIEVED,
  AUTH_CLEAR_USER,
  AUTH_CLEAR_AUTHENTICATION,
} from './constants';

// See ./sagas for implementation.
export const authenticate = (authLoginEndpoint, authClientId) => ({
  type: AUTH_AUTHENTICATE,
  payload: {
    authLoginEndpoint,
    authClientId,
  },
});

export const setToken = token => ({
  type: AUTH_SET_AUTHENTICATION,
  token,
});

export const logout = () => ({
  type: AUTH_CLEAR_AUTHENTICATION,
});

export const userRetrieved = user => ({
  type: AUTH_USER_RETRIEVED,
  user,
});

export const clearUser = () => ({
  type: AUTH_CLEAR_USER,
});
