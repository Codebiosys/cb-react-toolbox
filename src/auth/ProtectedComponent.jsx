import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import WithPermissions from './WithPermissions';
import { authenticate } from './actions';
import { getAuthUrl } from './sagas';

const PERMISSION_DENIED_MESSAGE = (
  'You do not have access to this application. Please contact your system '
  + 'administrator if you believe you\'ve recieved this message incorrectly.'
);

class ProtectedComponent extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.object,
    authenticate: PropTypes.func.isRequired,
    requiredPermissions: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  }

  static defaultProps = {
    token: null,
    user: null,
  }

  componentWillMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    if (!this.props.user) {
      this.props.authenticate();
    }
  }

  renderPermissionDenied = () => (
    <div className="container-fluid" style={{ marginTop: '20px' }}>
      <Panel bsStyle="danger">
        <Panel.Heading>Permission Denied</Panel.Heading>
        <Panel.Body>
          {PERMISSION_DENIED_MESSAGE}
          <p><a href={getAuthUrl()}>
            Try logging in with different credentials &#8594;
          </a></p>
        </Panel.Body>
      </Panel>
    </div>
  );

  render() {
    const { user, children, requiredPermissions } = this.props;

    if (!user) {
      return null;
    }

    return (
      <React.Fragment>
        <WithPermissions has={[...requiredPermissions]}>
          {children}
        </WithPermissions>
        <WithPermissions invert has={[...requiredPermissions]}>
          {this.renderPermissionDenied()}
        </WithPermissions>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: get(state, 'auth.user', false),
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => {
    dispatch(authenticate());
  },
});

/**
 * @typedef {Class} ProtectedComponent
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedComponent);
