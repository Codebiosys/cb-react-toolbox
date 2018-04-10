'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _WithPermissions = require('./WithPermissions');

var _WithPermissions2 = _interopRequireDefault(_WithPermissions);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PERMISSION_DENIED_MESSAGE = 'You do not have access to this application. Please contact your system ' + 'administrator if you believe you\'ve recieved this message incorrectly.';

var ProtectedComponent = function (_Component) {
  _inherits(ProtectedComponent, _Component);

  function ProtectedComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProtectedComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProtectedComponent.__proto__ || Object.getPrototypeOf(ProtectedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.renderPermissionDenied = function () {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid', style: { marginTop: '20px' } },
        _react2.default.createElement(
          _reactBootstrap.Panel,
          { bsStyle: 'danger' },
          _react2.default.createElement(
            _reactBootstrap.Panel.Heading,
            null,
            'Permission Denied'
          ),
          _react2.default.createElement(
            _reactBootstrap.Panel.Body,
            null,
            PERMISSION_DENIED_MESSAGE,
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { href: _this.props.authEndpoint },
                'Try logging in with different credentials \u2192'
              )
            )
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProtectedComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.checkAuthentication();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.checkAuthentication();
    }
  }, {
    key: 'checkAuthentication',
    value: function checkAuthentication() {
      if (!this.props.user) {
        this.props.authenticate();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          user = _props.user,
          children = _props.children,
          requiredPermissions = _props.requiredPermissions;


      if (!user) {
        return null;
      }

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _WithPermissions2.default,
          { has: [].concat(_toConsumableArray(requiredPermissions)) },
          children
        ),
        _react2.default.createElement(
          _WithPermissions2.default,
          { invert: true, has: [].concat(_toConsumableArray(requiredPermissions)) },
          this.renderPermissionDenied()
        )
      );
    }
  }]);

  return ProtectedComponent;
}(_react.Component);

ProtectedComponent.propTypes = {
  children: _propTypes2.default.node.isRequired,
  user: _propTypes2.default.object,
  authenticate: _propTypes2.default.func.isRequired,
  authEndpoint: _propTypes2.default.string.isRequired,
  requiredPermissions: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
};
ProtectedComponent.defaultProps = {
  token: null,
  user: null
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    user: (0, _lodash.get)(state, 'auth.user', false)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    authenticate: function authenticate() {
      dispatch((0, _actions.authenticate)(ownProps.authEndpoint, ownProps.userEndpoint));
    }
  };
};

/**
 * @typedef {Class} ProtectedComponent
 */

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProtectedComponent);