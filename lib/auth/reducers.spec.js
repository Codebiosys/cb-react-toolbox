'use strict';

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
describe('Auth Reducer', function () {
  var token = '--TEST--TOKEN--';
  var errors = ['There was an error'];
  var user = {
    username: 'TEST USER',
    permisions: []
  };

  it('pushes the correct state on auth succeed', function () {
    var state = (0, _reducers2.default)(_reducers.defaultState, {
      type: _constants.AUTH_SET_AUTHENTICATION,
      token: token
    });
    expect(state.authenticated).toBe(false);
    expect(state.token).toBe(token);
    expect(state.errors.length).toBe(0);
  });

  it('pushes the correct state on auth fail', function () {
    var state = (0, _reducers2.default)(_reducers.defaultState, {
      type: _constants.AUTH_FAILED,
      token: token,
      errors: errors
    });
    expect(state.authenticated).toBe(false);
    expect(state.token).toBeNull();
    expect(state.errors.length).toBe(errors.length);
  });

  it('pushes the correct state on user retrieved', function () {
    var state = (0, _reducers2.default)(_reducers.defaultState, {
      type: _constants.AUTH_USER_RETRIEVED,
      user: user
    });
    expect(state.user).toEqual(user);
  });

  it('pushes the correct state on clear', function () {
    var state = (0, _reducers2.default)(_reducers.defaultState, {
      type: _constants.AUTH_CLEAR_USER
    });
    expect(state.user).toEqual(null);
  });
});