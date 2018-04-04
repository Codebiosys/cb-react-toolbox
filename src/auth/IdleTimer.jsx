import React from 'react';
import PropTypes from 'prop-types';

import IdleTimer from 'react-idle-timer';

const idleTimeout = parseInt(process.env.IDLE_TIMEOUT, 10);

const LogoutIdleTimer = ({ logout, children }) => (
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
};

export default LogoutIdleTimer;
