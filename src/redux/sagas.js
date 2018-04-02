import { get } from 'lodash';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import fetch from 'unfetch';

import {
  AUTH_AUTHENTICATE,
  AUTH_UNAUTHENTICATED,
  AUTH_USER_RETRIEVED,
  AUTH_USER_FAILED,
  AUTH_CLEAR_AUTHENTICATION,
  AUTH_AUTHENTICATED,
} from './constants';

export const getAuthUrl = () => {
  const next = `/auth/o/authorize/?client_id=${process.env.AUTH_CLIENT_ID}&response_type=token`;
  const encodedNext = encodeURIComponent(next);
  return `${process.env.AUTH_LOGIN_ENDPOINT}?next=${encodedNext}`;
};

export const goToAuth = /* istanbul ignore next */() => {
  window.location = getAuthUrl();
};

export const checkToken = token => (
  new Promise((resolve, reject) => {
    if (!token) {
      reject({ isValid: false, error: { message: 'No token provided' } });
      return;
    }

    /**
     * Attempting to fetch the protected user route serves the purpose of both
     * validating the token, and fetching the current token-bearing user.
     */

    fetch('/auth/user/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      resolve({ isValid: response.status === 200, response });
    }).catch((error) => {
      reject({ isValid: false, error });
    });
  })
);

export const getAuthTokenFromState = state => get(state, 'app.auth.token', null);

export const getAuthUserFromState = state => get(state, 'app.auth.user', null);

export function* checkAuthentication() {
  const token = yield select(getAuthTokenFromState);

  try {
    const { isValid, response } = yield checkToken(token);
    if (isValid) {
      // We have a valid user token.
      yield put({ type: AUTH_AUTHENTICATED });

      // Parse the user and set the value to the state.
      const user = yield response.json();
      yield put({ type: AUTH_USER_RETRIEVED, user });
    } else {
      yield put({ type: AUTH_UNAUTHENTICATED });
      yield put({ type: AUTH_CLEAR_AUTHENTICATION });
      yield call(goToAuth);
    }
  } catch (e) {
    yield put({ type: AUTH_UNAUTHENTICATED });
    yield put({ type: AUTH_CLEAR_AUTHENTICATION });
    yield put({ type: AUTH_USER_FAILED });
    yield call(goToAuth);
  }
}

export function* authSaga() {
  yield takeLatest(AUTH_AUTHENTICATE, checkAuthentication);
}
