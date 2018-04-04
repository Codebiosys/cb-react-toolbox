'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationErrorDisclosure = function (_React$Component) {
  _inherits(NotificationErrorDisclosure, _React$Component);

  function NotificationErrorDisclosure(props) {
    _classCallCheck(this, NotificationErrorDisclosure);

    var _this = _possibleConstructorReturn(this, (NotificationErrorDisclosure.__proto__ || Object.getPrototypeOf(NotificationErrorDisclosure)).call(this, props));

    _this.toggleCollapse = function () {
      _this.setState(_extends({}, _this.state, { open: !_this.state.open }));
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

NotificationErrorDisclosure.propTypes = {
  error: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};
exports.default = NotificationErrorDisclosure;