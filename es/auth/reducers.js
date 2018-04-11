'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var defaultState = {
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
  user: localStorage.getItem('idToken') // eslint-disable-line
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.AUTH_SET_AUTHENTICATION:
      return _extends({}, state, { token: action.token });
    case _constants.AUTH_AUTHENTICATED:
      return _extends({}, state, { authenticated: true });
    case _constants.AUTH_UNAUTHORIZED:
      return _extends({}, state, { authenticated: false, token: null });
    case _constants.AUTH_FAILED:
      return _extends({}, state, { authenticated: false, token: null, errors: action.errors });
    case _constants.AUTH_USER_RETRIEVED:
      return _extends({}, state, { user: action.user });
    case _constants.AUTH_CLEAR_AUTHENTICATION:
      return _extends({}, defaultState, { authenticated: false, token: null, user: null });
    case _constants.AUTH_CLEAR_USER:
      return _extends({}, defaultState, { user: null });
    default:
      return state;
  }
};