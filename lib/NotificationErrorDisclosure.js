'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationErrorDisclosure = function (_React$Component) {
  (0, _inherits3.default)(NotificationErrorDisclosure, _React$Component);

  function NotificationErrorDisclosure(props) {
    (0, _classCallCheck3.default)(this, NotificationErrorDisclosure);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NotificationErrorDisclosure.__proto__ || (0, _getPrototypeOf2.default)(NotificationErrorDisclosure)).call(this, props));

    _this.toggleCollapse = function () {
      _this.setState((0, _extends3.default)({}, _this.state, { open: !_this.state.open }));
    };

    _this.render = function () {
      return _react2.default.createElement(
        'div',
        { className: 'text-right' },
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'danger', bsSize: 'xsmall', onClick: _this.toggleCollapse },
          'More Info'
        ),
        _react2.default.createElement(
          _reactBootstrap.Collapse,
          { 'in': _this.state.open },
          _react2.default.createElement(
            'div',
            { className: 'text-left', style: { marginTop: '10px' } },
            _this.props.error.message
          )
        )
      );
    };

    _this.state = {
      open: false
    };
    return _this;
  }

  return NotificationErrorDisclosure;
}(_react2.default.Component);

exports.default = NotificationErrorDisclosure;