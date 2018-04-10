import React from 'react';
import PropTypes from 'prop-types';

import IdleTimer from 'react-idle-timer';

const LogoutIdleTimer = ({ logout, idleTimeout, children }) => (
  <IdleTimer
    element={document}
    idleAction={logout}
    timeout={idleTimeout}
    format="MM-DD-YYYY HH:MM:ss.SSS"
  >
    { children }
  </IdleTimer>
);

LogoutIdleTimer.propTypes = {
  logout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  idleTimeout: PropTypes.number,
};

LogoutIdleTimer.defaultProps = {
  idleTimeout: 10,
};

export default LogoutIdleTimer;
