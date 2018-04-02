/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import AuthReducer, { defaultState } from './reducers';
import {
  AUTH_USER_RETRIEVED,
  AUTH_SET_AUTHENTICATION,
  AUTH_FAILED,
  AUTH_CLEAR_USER,
} from './constants';

describe('Auth Reducer', () => {
  const token = '--TEST--TOKEN--';
  const errors = [
    'There was an error',
  ];
  const user = {
    username: 'TEST USER',
    permisions: [],
  };

  it('pushes the correct state on auth succeed', () => {
    const state = AuthReducer(defaultState, {
      type: AUTH_SET_AUTHENTICATION,
      token,
    });
    expect(state.authenticated).toBe(false);
    expect(state.token).toBe(token);
    expect(state.errors.length).toBe(0);
  });

  it('pushes the correct state on auth fail', () => {
    const state = AuthReducer(defaultState, {
      type: AUTH_FAILED,
      token,
      errors,
    });
    expect(state.authenticated).toBe(false);
    expect(state.token).toBeNull();
    expect(state.errors.length).toBe(errors.length);
  });

  it('pushes the correct state on user retrieved', () => {
    const state = AuthReducer(defaultState, {
      type: AUTH_USER_RETRIEVED,
      user,
    });
    expect(state.user).toEqual(user);
  });

  it('pushes the correct state on clear', () => {
    const state = AuthReducer(defaultState, {
      type: AUTH_CLEAR_USER,
    });
    expect(state.user).toEqual(null);
  });
});
