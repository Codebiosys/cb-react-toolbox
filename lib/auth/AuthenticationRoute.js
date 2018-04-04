'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthenticationRoute = function AuthenticationRoute(_ref) {
  var setAccessToken = _ref.setAccessToken,
      location = _ref.location,
      next = _ref.next;

  var _queryString$parse = _queryString2.default.parse(location.hash),
      access_token = _queryString$parse.access_token;

  setAccessToken(access_token);
  return _react2.default.createElement(_reactRouterDom.Redirect, { to: next });
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setAccessToken: function setAccessToken(token) {
      dispatch((0, _actions.setToken)(token));
    }
  };
};

/**
 * @typedef {Class} AuthenticationRoute
 */
exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(null, mapDispatchToProps)(AuthenticationRoute));