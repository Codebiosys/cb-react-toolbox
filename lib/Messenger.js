'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _reactNotificationSystemRedux = require('react-notification-system-redux');

var _reactNotificationSystemRedux2 = _interopRequireDefault(_reactNotificationSystemRedux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
};

/**
 * @typedef {Class} Messenger
 *
 * @desc Notification management via redux. Include the notification in the outer
 * scope of your application, and then dispatch the appropriate actions.
 *
 * @see https://github.com/gor181/react-notification-system-redux
 */
exports.default = (0, _reactRedux.connect)(mapStateToProps)(_reactNotificationSystemRedux2.default);