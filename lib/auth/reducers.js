'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  token: localStorage.getItem('accessToken'),

  /**
   *
   */
  user: localStorage.getItem('idToken')
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.AUTH_SET_AUTHENTICATION:
      return (0, _extends3.default)({}, state, { token: action.token });
    case _constants.AUTH_AUTHENTICATED:
      return (0, _extends3.default)({}, state, { authenticated: true });
    case _constants.AUTH_UNAUTHORIZED:
      return (0, _extends3.default)({}, state, { authenticated: false, token: null });
    case _constants.AUTH_FAILED:
      return (0, _extends3.default)({}, state, { authenticated: false, token: null, errors: action.errors });
    case _constants.AUTH_USER_RETRIEVED:
      return (0, _extends3.default)({}, state, { user: action.user });
    case _constants.AUTH_CLEAR_AUTHENTICATION:
      return (0, _extends3.default)({}, defaultState, { authenticated: false, token: null, user: null });
    case _constants.AUTH_CLEAR_USER:
      return (0, _extends3.default)({}, defaultState, { user: null });
    default:
      return state;
  }
};