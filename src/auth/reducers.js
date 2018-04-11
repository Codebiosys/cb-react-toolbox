import {
  AUTH_SET_AUTHENTICATION,
  AUTH_CLEAR_AUTHENTICATION,
  AUTH_USER_RETRIEVED,
  AUTH_CLEAR_USER,
  AUTH_UNAUTHORIZED,
  AUTH_FAILED,
  AUTH_AUTHENTICATED,
} from './constants';


const defaultState = {
  /**
   * Whether or not the client has been authenticated under a given user.
   * If this value is true, then a token will be present.
   */
  authenticated: false,

  /**
   * A list of any error messages that occurred during processing. Messages will
   * only be present if the authentication process failed or errored out.
   */
  errors: [],

  /**
   * The current Authentication Token if the user was successfully authenticated.
   */
  token: localStorage.getItem('accessToken'), // eslint-disable-line

  /**
   *
   */
  user: localStorage.getItem('idToken'), // eslint-disable-line
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_SET_AUTHENTICATION:
      return { ...state, token: action.token };
    case AUTH_AUTHENTICATED:
      return { ...state, authenticated: true };
    case AUTH_UNAUTHORIZED:
      return { ...state, authenticated: false, token: null };
    case AUTH_FAILED:
      return { ...state, authenticated: false, token: null, errors: action.errors };
    case AUTH_USER_RETRIEVED:
      return { ...state, user: action.user };
    case AUTH_CLEAR_AUTHENTICATION:
      return { ...defaultState, authenticated: false, token: null, user: null };
    case AUTH_CLEAR_USER:
      return { ...defaultState, user: null };
    default:
      return state;
  }
};
