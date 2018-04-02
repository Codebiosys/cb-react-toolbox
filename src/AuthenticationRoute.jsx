import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { setToken } from './redux/actions';

const AuthenticationRoute = ({ setAccessToken, location, next }) => {
  const { access_token } = queryString.parse(location.hash);
  setAccessToken(access_token);
  return <Redirect to={next} />;
};

AuthenticationRoute.propTypes = {
  location: PropTypes.any.isRequired,
  setAccessToken: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setAccessToken: (token) => {
    dispatch(setToken(token));
  },
});

/**
 * @typedef {Class} AuthenticationRoute
 */
export default withRouter(connect(
  null,
  mapDispatchToProps,
)(AuthenticationRoute));
