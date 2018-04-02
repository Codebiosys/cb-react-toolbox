import { connect } from 'react-redux';
import { get } from 'lodash';

import WithPermissions from './components/WithPermissions';

const PERMISSIONS_PATH = 'auth.user.permissions';

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
