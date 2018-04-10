'use strict';

var _effects = require('redux-saga/effects');

var _sagas = require('./sagas');

var _constants = require('./constants');

// fetch is set up in /setupJest.js, and is used here.

var AUTH_LOGIN_ENDPOINT = '/auth/accounts/login/';
var AUTH_CLIENT_ID = '12345';

var AUTH_LOGIN_ENDPOINT_ORIG = process.env.AUTH_LOGIN_ENDPOINT || AUTH_LOGIN_ENDPOINT;
var AUTH_CLIENT_ID_ORIG = process.env.AUTH_CLIENT_ID || AUTH_CLIENT_ID;

describe('Sagas', function () {
  beforeAll(function () {
    process.env.AUTH_LOGIN_ENDPOINT = AUTH_LOGIN_ENDPOINT;
    process.env.AUTH_CLIENT_ID = AUTH_CLIENT_ID;
  });
  afterAll(function () {
    process.env.AUTH_LOGIN_ENDPOINT = AUTH_LOGIN_ENDPOINT_ORIG;
    process.env.AUTH_CLIENT_ID = AUTH_CLIENT_ID_ORIG;
  });
  describe('getAuthUrl', function () {
    it('should get the valid auth URL.', function () {
      var url = (0, _sagas.getAuthUrl)();
      expect(url).toMatch(process.env.AUTH_LOGIN_ENDPOINT);
      expect(url).toMatch(process.env.AUTH_CLIENT_ID);
    });
  });

  describe('checkToken', function () {
    it('should reject when there is no token', function () {
      expect.assertions(1);
      return expect((0, _sagas.checkToken)()).rejects.toEqual({
        isValid: false,
        error: {
          message: 'No token provided'
        }
      });
    });
    it('should call the auth api with the token in the header', function () {
      var TOKEN = '1234';
      (0, _sagas.checkToken)(TOKEN);
      expect(fetch).toHaveBeenCalledWith('/auth/user/', { headers: {
          Authorization: 'Bearer ' + TOKEN
        } });
    });
    it('should resolve as valid when the auth service returns valid', function () {
      var TOKEN = '1234';
      expect.assertions(1);
      fetch.mockResponse({ status: 200 });
      return expect((0, _sagas.checkToken)(TOKEN)).resolves.toEqual(expect.objectContaining({ isValid: true }));
    });
    it('should reject as invalid when the auth service returns invalid', function () {
      var TOKEN = '1234';
      var response = { status: 401, message: 'The token was invalid' };
      expect.assertions(1);
      fetch.mockReject(response);
      return expect((0, _sagas.checkToken)(TOKEN)).rejects.toEqual({ isValid: false, error: response });
    });
  });

  describe('getAuthTokenFromState', function () {
    it('should get the state', function () {
      var state = { app: { auth: { token: '123123' } } };
      expect((0, _sagas.getAuthTokenFromState)(state)).toEqual('123123');
    });
    it('should handle a missing token', function () {
      var state = { app: { auth: {} } };
      expect((0, _sagas.getAuthTokenFromState)(state)).toEqual(null);
    });
  });

  describe('getAuthUserFromState', function () {
    it('should get the state', function () {
      var state = { app: { auth: { user: 'bob' } } };
      expect((0, _sagas.getAuthUserFromState)(state)).toEqual('bob');
    });
    it('should handle a missing token', function () {
      var state = { app: { auth: {} } };
      expect((0, _sagas.getAuthUserFromState)(state)).toEqual(null);
    });
  });

  describe('checkAuthentication', function () {
    it('should reject when there is no token', function () {
      var gen = (0, _sagas.checkAuthentication)();
      expect(gen.next().value).toEqual((0, _effects.select)(_sagas.getAuthTokenFromState));
      gen.next(); // Get authentication Token.
      expect(gen.next().value).toEqual((0, _effects.put)({ type: _constants.AUTH_UNAUTHENTICATED }));
      expect(gen.next().value).toEqual((0, _effects.put)({ type: _constants.AUTH_CLEAR_AUTHENTICATION }));
      expect(gen.next().value).toEqual((0, _effects.put)({ type: _constants.AUTH_USER_FAILED }));
      expect(gen.next().value).toEqual((0, _effects.call)(_sagas.goToAuth));
      expect(gen.next().done).toEqual(true);
    });
    it('should reject when there is an invalid token', function () {
      var gen = (0, _sagas.checkAuthentication)();
      expect(gen.next().value).toEqual((0, _effects.select)(_sagas.getAuthTokenFromState));
      gen.next(); // Get authentication Token.
      var authResult = { isValid: false };
      expect(gen.next(authResult).value).toEqual((0, _effects.put)({ type: _constants.AUTH_UNAUTHENTICATED }));
      expect(gen.next().value).toEqual((0, _effects.put)({ type: _constants.AUTH_CLEAR_AUTHENTICATION }));
      expect(gen.next().value).toEqual((0, _effects.call)(_sagas.goToAuth));
      expect(gen.next().done).toEqual(true);
    });

    it('should allow when the token is valid', function () {
      fetch.mockResponse({ status: 200, json: function json() {
          return new Promise(function (resolve) {
            return resolve({});
          });
        } });

      var gen = (0, _sagas.checkAuthentication)();
      expect(gen.next().value).toEqual((0, _effects.select)(_sagas.getAuthTokenFromState));
      gen.next(); // Check token
      var response = {
        isValid: true,
        response: {
          status: 200,
          json: function json() {
            return new Promise(function (resolve) {
              return resolve({});
            });
          }
        }
      };
      expect(gen.next(response).value).toEqual((0, _effects.put)({ type: _constants.AUTH_AUTHENTICATED }));
      gen.next(); // Parse the json
      expect(gen.next({}).value).toEqual((0, _effects.put)({ type: _constants.AUTH_USER_RETRIEVED, user: {} }));
    });
  });
});