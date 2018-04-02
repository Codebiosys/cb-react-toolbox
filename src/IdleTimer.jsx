import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from './redux/actions';

import IdleTimer from './components/IdleTimer';


export const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(IdleTimer));
