'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIdleTimer = require('react-idle-timer');

var _reactIdleTimer2 = _interopRequireDefault(_reactIdleTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idleTimeout = parseInt(process.env.IDLE_TIMEOUT, 10);

var LogoutIdleTimer = function LogoutIdleTimer(_ref) {
  var logout = _ref.logout,
      children = _ref.children;
  return _react2.default.createElement(
    _reactIdleTimer2.default,
    {
      element: document,
      idleAction: logout,
      timeout: idleTimeout,
      format: 'MM-DD-YYYY HH:MM:ss.SSS'
    },
    children
  );
};

LogoutIdleTimer.propTypes = {
  logout: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node.isRequired
};

exports.default = LogoutIdleTimer;