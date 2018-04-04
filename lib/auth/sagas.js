'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthUserFromState = exports.getAuthTokenFromState = exports.checkToken = exports.goToAuth = exports.getAuthUrl = undefined;
exports.checkAuthentication = checkAuthentication;
exports.authSaga = authSaga;

var _lodash = require('lodash');

var _effects = require('redux-saga/effects');

var _unfetch = require('unfetch');

var _unfetch2 = _interopRequireDefault(_unfetch);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(checkAuthentication),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(authSaga);

var getAuthUrl = exports.getAuthUrl = function getAuthUrl() {
  var next = '/auth/o/authorize/?client_id=' + process.env.AUTH_CLIENT_ID + '&response_type=token';
  var encodedNext = encodeURIComponent(next);
  return process.env.AUTH_LOGIN_ENDPOINT + '?next=' + encodedNext;
};

var goToAuth = /* istanbul ignore next */exports.goToAuth = function goToAuth() {
  window.location = getAuthUrl();
};

var checkToken = exports.checkToken = function checkToken(token) {
  return new Promise(function (resolve, reject) {
    if (!token) {
      reject({ isValid: false, error: { message: 'No token provided' } });
      return;
    }

    /**
     * Attempting to fetch the protected user route serves the purpose of both
     * validating the token, and fetching the current token-bearing user.
     */

    (0, _unfetch2.default)('/auth/user/', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(function (response) {
      resolve({ isValid: response.status === 200, response: response });
    }).catch(function (error) {
      reject({ isValid: false, error: error });
    });
  });
};

var getAuthTokenFromState = exports.getAuthTokenFromState = function getAuthTokenFromState(state) {
  return (0, _lodash.get)(state, 'app.auth.token', null);
};

var getAuthUserFromState = exports.getAuthUserFromState = function getAuthUserFromState(state) {
  return (0, _lodash.get)(state, 'app.auth.user', null);
};

function checkAuthentication() {
  var token, _ref, isValid, response, user;

  return regeneratorRuntime.wrap(function checkAuthentication$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(getAuthTokenFromState);

        case 2:
          token = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return checkToken(token);

        case 6:
          _ref = _context.sent;
          isValid = _ref.isValid;
          response = _ref.response;

          if (!isValid) {
            _context.next = 19;
            break;
          }

          _context.next = 12;
          return (0, _effects.put)({ type: _constants.AUTH_AUTHENTICATED });

        case 12:
          _context.next = 14;
          return response.json();

        case 14:
          user = _context.sent;
          _context.next = 17;
          return (0, _effects.put)({ type: _constants.AUTH_USER_RETRIEVED, user: user });

        case 17:
          _context.next = 25;
          break;

        case 19:
          _context.next = 21;
          return (0, _effects.put)({ type: _constants.AUTH_UNAUTHENTICATED });

        case 21:
          _context.next = 23;
          return (0, _effects.put)({ type: _constants.AUTH_CLEAR_AUTHENTICATION });

        case 23:
          _context.next = 25;
          return (0, _effects.call)(goToAuth);

        case 25:
          _context.next = 37;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context['catch'](3);
          _context.next = 31;
          return (0, _effects.put)({ type: _constants.AUTH_UNAUTHENTICATED });

        case 31:
          _context.next = 33;
          return (0, _effects.put)({ type: _constants.AUTH_CLEAR_AUTHENTICATION });

        case 33:
          _context.next = 35;
          return (0, _effects.put)({ type: _constants.AUTH_USER_FAILED });

        case 35:
          _context.next = 37;
          return (0, _effects.call)(goToAuth);

        case 37:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[3, 27]]);
}

function authSaga() {
  return regeneratorRuntime.wrap(function authSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(_constants.AUTH_AUTHENTICATE, checkAuthentication);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}