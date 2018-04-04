'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(WithPermissions, _React$Component);

  function WithPermissions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WithPermissions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithPermissions.__proto__ || Object.getPrototypeOf(WithPermissions)).call.apply(_ref, [this].concat(args))), _this), _this.shouldRenderChildren = function () {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return WithPermissions;
}(_react2.default.Component);

WithPermissions.defaultProps = {
  invert: false
};
exports.default = WithPermissions;