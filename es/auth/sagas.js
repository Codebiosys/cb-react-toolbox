'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthUserFromState = exports.getAuthTokenFromState = exports.checkToken = exports.goToAuth = undefined;
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

var goToAuth = exports.goToAuth = function goToAuth(authEndpoint) {
  window.location = authEndpoint; // eslint-disable-line
};

var checkToken = exports.checkToken = function checkToken(token, userEndpoint) {
  return new Promise(function (resolve, reject) {
    if (!token) {
      reject({ isValid: false, error: { message: 'No token provided' } });
      return;
    }

    /**
     * Attempting to fetch the protected user route serves the purpose of both
     * validating the token, and fetching the current token-bearing user.
     */

    (0, _unfetch2.default)(userEndpoint, {
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
  return (0, _lodash.get)(state, 'auth.token', null);
};

var getAuthUserFromState = exports.getAuthUserFromState = function getAuthUserFromState(state) {
  return (0, _lodash.get)(state, 'auth.user', null);
};

function checkAuthentication(_ref) {
  var payload = _ref.payload;

  var authEndpoint, userEndpoint, token, _ref2, isValid, response, user;

  return regeneratorRuntime.wrap(function checkAuthentication$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authEndpoint = payload.authEndpoint, userEndpoint = payload.userEndpoint;
          _context.next = 3;
          return (0, _effects.select)(getAuthTokenFromState);

        case 3:
          token = _context.sent;
          _context.prev = 4;
          _context.next = 7;
          return checkToken(token, userEndpoint);

        case 7:
          _ref2 = _context.sent;
          isValid = _ref2.isValid;
          response = _ref2.response;

          if (!isValid) {
            _context.next = 20;
            break;
          }

          _context.next = 13;
          return (0, _effects.put)({ type: _constants.AUTH_AUTHENTICATED });

        case 13:
          _context.next = 15;
          return response.json();

        case 15:
          user = _context.sent;
          _context.next = 18;
          return (0, _effects.put)({ type: _constants.AUTH_USER_RETRIEVED, user: user });

        case 18:
          _context.next = 26;
          break;

        case 20:
          _context.next = 22;
          return (0, _effects.put)({ type: _constants.AUTH_UNAUTHENTICATED });

        case 22:
          _context.next = 24;
          return (0, _effects.put)({ type: _constants.AUTH_CLEAR_AUTHENTICATION });

        case 24:
          _context.next = 26;
          return (0, _effects.call)(goToAuth, [authEndpoint]);

        case 26:
          _context.next = 38;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context['catch'](4);
          _context.next = 32;
          return (0, _effects.put)({ type: _constants.AUTH_UNAUTHENTICATED });

        case 32:
          _context.next = 34;
          return (0, _effects.put)({ type: _constants.AUTH_CLEAR_AUTHENTICATION });

        case 34:
          _context.next = 36;
          return (0, _effects.put)({ type: _constants.AUTH_USER_FAILED });

        case 36:
          _context.next = 38;
          return (0, _effects.call)(goToAuth, [authEndpoint]);

        case 38:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[4, 28]]);
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