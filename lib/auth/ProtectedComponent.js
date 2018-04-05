'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _sagas = require('./sagas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PERMISSION_DENIED_MESSAGE = 'You do not have access to this application. Please contact your system ' + 'administrator if you believe you\'ve recieved this message incorrectly.';

var ProtectedComponent = function (_Component) {
  (0, _inherits3.default)(ProtectedComponent, _Component);

  function ProtectedComponent() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ProtectedComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ProtectedComponent.__proto__ || (0, _getPrototypeOf2.default)(ProtectedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.renderPermissionDenied = function () {
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
                { href: (0, _sagas.getAuthUrl)() },
                'Try logging in with different credentials \u2192'
              )
            )
          )
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ProtectedComponent, [{
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
          { has: [].concat((0, _toConsumableArray3.default)(requiredPermissions)) },
          children
        ),
        _react2.default.createElement(
          _WithPermissions2.default,
          { invert: true, has: [].concat((0, _toConsumableArray3.default)(requiredPermissions)) },
          this.renderPermissionDenied()
        )
      );
    }
  }]);
  return ProtectedComponent;
}(_react.Component);

ProtectedComponent.defaultProps = {
  token: null,
  user: null
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    user: (0, _lodash.get)(state, 'auth.user', false)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    authenticate: function authenticate() {
      dispatch((0, _actions.authenticate)());
    }
  };
};

/**
 * @typedef {Class} ProtectedComponent
 */

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProtectedComponent);