import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

const PERMISSIONS_PATH = 'auth.user.permissions';

/**
 * WithPermissions renders it's children if and only if all of the permissions
 * specified in it's props are found in it's list of the user's permissions.
 *
 * This component also allows for an inversion of the permissions for
 * convenience. If `invert == true` then the component will render it's children
 * if and only if the required permissions are not all present in the list of
 * list of the user's permissions.
 *
 * Inversion is disabled by default.
 *
 * Usage Example
 * -------------
 *
 * const children = ...;
 * const userPermissions = ['read'];
 *
 * // In this case, the user does not have the permission required
 * // to render the child elements.
 * return (
 *    <WithPermissions
 *      userPermissions={userPermissions}
 *      has={['write']}
 *    >
 *      {children}
 *    </WithPermissions>
 *
 * );
 */
export class WithPermissions extends React.Component {
  static propTypes = {
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    has: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    invert: PropTypes.bool,
  };

  static defaultProps = {
    invert: false,
  };

  shouldRenderChildren = () => {
    const { invert, userPermissions, has } = this.props;

    const hasPermission = has.every(name => (
      userPermissions.some(codename => (codename === name))
    ));

    // Only one of these can be true.
    return (invert !== hasPermission);
  };

  render = () => {
    if (!this.shouldRenderChildren()) {
      return null;
    }
    return (this.props.children);
  };
}

export const mapStateToProps = (state) => {
  // Get the permissions from the state and extract the codename. We don't need the rest.
  const userPermissions = get(state, PERMISSIONS_PATH, []).map(({ codename }) => (
    codename
  ));
  return { userPermissions };
};

export default connect(
  mapStateToProps,
  null,
)(WithPermissions);
