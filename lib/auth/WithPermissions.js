'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PERMISSIONS_PATH = 'auth.user.permissions';

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

var WithPermissions = function (_React$Component) {
  (0, _inherits3.default)(WithPermissions, _React$Component);

  function WithPermissions() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, WithPermissions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WithPermissions.__proto__ || (0, _getPrototypeOf2.default)(WithPermissions)).call.apply(_ref, [this].concat(args))), _this), _this.shouldRenderChildren = function () {
      var _this$props = _this.props,
          invert = _this$props.invert,
          userPermissions = _this$props.userPermissions,
          has = _this$props.has;


      var hasPermission = has.every(function (name) {
        return userPermissions.some(function (codename) {
          return codename === name;
        });
      });

      // Only one of these can be true.
      return invert !== hasPermission;
    }, _this.render = function () {
      if (!_this.shouldRenderChildren()) {
        return null;
      }
      return _this.props.children;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return WithPermissions;
}(_react2.default.Component);

WithPermissions.defaultProps = {
  invert: false
};
var mapStateToProps = exports.mapStateToProps = function mapStateToProps(state) {
  // Get the permissions from the state and extract the codename. We don't need the rest.
  var userPermissions = (0, _lodash.get)(state, PERMISSIONS_PATH, []).map(function (_ref2) {
    var codename = _ref2.codename;
    return codename;
  });
  return { userPermissions: userPermissions };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(WithPermissions);