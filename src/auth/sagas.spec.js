import { put, call, select } from 'redux-saga/effects';

import {
  goToAuth,
  checkToken,
  checkAuthentication,
  getAuthTokenFromState,
  getAuthUserFromState,
} from './sagas';

import {
  AUTH_AUTHENTICATED,
  AUTH_UNAUTHENTICATED,
  AUTH_USER_RETRIEVED,
  AUTH_USER_FAILED,
  AUTH_CLEAR_AUTHENTICATION,
} from './constants';

// fetch is set up in /setupJest.js, and is used here.

describe('Sagas', () => {
  describe('checkToken', () => {
    it('should reject when there is no token', () => {
      expect.assertions(1);
      return expect(checkToken()).rejects.toEqual({
        isValid: false,
        error: {
          message: 'No token provided',
        },
      });
    });
    it('should call the auth api with the token in the header', () => {
      const TOKEN = '1234';
      const USER_ENDPOINT = '/auth/user/';
      checkToken(TOKEN, USER_ENDPOINT);
      expect(fetch).toHaveBeenCalledWith( // eslint-disable-line
        USER_ENDPOINT,
        { headers: {
          Authorization: `Bearer ${TOKEN}`,
        } },
      );
    });
    it('should resolve as valid when the auth service returns valid', () => {
      const TOKEN = '1234';
      const USER_ENDPOINT = '/auth/user/';
      expect.assertions(1);
      fetch.mockResponse({ status: 200 }); // eslint-disable-line
      return expect(checkToken(TOKEN, USER_ENDPOINT),
        ).resolves.toEqual(expect.objectContaining({ isValid: true }));
    });
    it('should reject as invalid when the auth service returns invalid', () => {
      const TOKEN = '1234';
      const response = { status: 401, message: 'The token was invalid' };
      expect.assertions(1);
      fetch.mockReject(response); // eslint-disable-line
      return expect(checkToken(TOKEN)).rejects.toEqual({ isValid: false, error: response });
    });
  });

  describe('getAuthTokenFromState', () => {
    it('should get the state', () => {
      const state = { auth: { token: '123123' } };
      expect(getAuthTokenFromState(state)).toEqual('123123');
    });
    it('should handle a missing token', () => {
      const state = { auth: { } };
      expect(getAuthTokenFromState(state)).toEqual(null);
    });
  });

  describe('getAuthUserFromState', () => {
    it('should get the state', () => {
      const state = { auth: { user: 'bob' } };
      expect(getAuthUserFromState(state)).toEqual('bob');
    });
    it('should handle a missing token', () => {
      const state = { auth: { } };
      expect(getAuthUserFromState(state)).toEqual(null);
    });
  });

  describe('checkAuthentication', () => {
    it('should reject when there is no token', () => {
      const payload = {
        authEndpoint: '/auth/endpoint',
        userEndpoint: '/auth/user',
      };
      const gen = checkAuthentication({ payload });
      expect(gen.next().value).toEqual(select(getAuthTokenFromState));
      gen.next(); // Get authentication Token.
      expect(gen.next().value).toEqual(put({ type: AUTH_UNAUTHENTICATED }));
      expect(gen.next().value).toEqual(put({ type: AUTH_CLEAR_AUTHENTICATION }));
      expect(gen.next().value).toEqual(put({ type: AUTH_USER_FAILED }));
      expect(gen.next().value).toEqual(call(goToAuth, [payload.authEndpoint]));
      expect(gen.next().done).toEqual(true);
    });
    it('should reject when there is an invalid token', () => {
      const payload = {
        authEndpoint: '/auth/endpoint',
        userEndpoint: '/auth/user',
      };
      const gen = checkAuthentication({ payload });
      expect(gen.next().value).toEqual(select(getAuthTokenFromState));
      gen.next(); // Get authentication Token.
      const authResult = { isValid: false };
      expect(gen.next(authResult).value).toEqual(put({ type: AUTH_UNAUTHENTICATED }));
      expect(gen.next().value).toEqual(put({ type: AUTH_CLEAR_AUTHENTICATION }));
      expect(gen.next().value).toEqual(call(goToAuth, [payload.authEndpoint]));
      expect(gen.next().done).toEqual(true);
    });

    it('should allow when the token is valid', () => {
      fetch.mockResponse({ status: 200, json: () => (new Promise(resolve => resolve({}))) }); // eslint-disable-line
      const payload = {
        authEndpoint: '/auth/endpoint',
        userEndpoint: '/auth/user',
      };
      const gen = checkAuthentication({ payload });
      expect(gen.next().value).toEqual(select(getAuthTokenFromState));
      gen.next(); // Check token
      const response = {
        isValid: true,
        response: {
          status: 200,
          json: () => (new Promise(resolve => resolve({}))),
        },
      };
      expect(gen.next(response).value).toEqual(put({ type: AUTH_AUTHENTICATED }));
      gen.next(); // Parse the json
      expect(gen.next({}).value).toEqual(put({ type: AUTH_USER_RETRIEVED, user: {} }));
    });
  });
});
