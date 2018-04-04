'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps = undefined;

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _actions = require('./redux/actions');

var _IdleTimer = require('./components/IdleTimer');

var _IdleTimer2 = _interopRequireDefault(_IdleTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = exports.mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logout: function logout() {
      dispatch((0, _actions.logout)());
    }
  };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(null, mapDispatchToProps)(_IdleTimer2.default));