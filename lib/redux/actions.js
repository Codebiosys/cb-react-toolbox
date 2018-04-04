'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearUser = exports.userRetrieved = exports.logout = exports.setToken = exports.authenticate = undefined;

var _constants = require('./constants');

// See ./sagas for implementation.
var authenticate = exports.authenticate = function authenticate() {
  return {
    type: _constants.AUTH_AUTHENTICATE
  };
};

var setToken = exports.setToken = function setToken(token) {
  return {
    type: _constants.AUTH_SET_AUTHENTICATION,
    token: token
  };
};

var logout = exports.logout = function logout() {
  return {
    type: _constants.AUTH_CLEAR_AUTHENTICATION
  };
};

var userRetrieved = exports.userRetrieved = function userRetrieved(user) {
  return {
    type: _constants.AUTH_USER_RETRIEVED,
    user: user
  };
};

var clearUser = exports.clearUser = function clearUser() {
  return {
    type: _constants.AUTH_CLEAR_USER
  };
};