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

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorBoundary = function (_React$Component) {
  (0, _inherits3.default)(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    (0, _classCallCheck3.default)(this, ErrorBoundary);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ErrorBoundary.__proto__ || (0, _getPrototypeOf2.default)(ErrorBoundary)).call(this));

    _this.render = function () {
      var uncaughtError = _this.state.uncaughtError;

      if (uncaughtError) {
        return _react2.default.createElement(
          'div',
          { className: 'container', style: { marginTop: '20px' } },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { bsStyle: 'danger' },
            _react2.default.createElement(
              _reactBootstrap.Panel.Heading,
              null,
              'An uncaught rendering error has occurred!'
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Body,
              null,
              _react2.default.createElement(
                'p',
                null,
                'This failure is unrecoverable. Please contact the system administrator.'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Logging in and out will not solve this issue.'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Footer,
              { className: 'text-right' },
              _react2.default.createElement(
                'i',
                null,
                'All that\'s left to us is honor.'
              )
            )
          )
        );
      }

      return _this.props.children;
    };

    _this.state = (0, _extends3.default)({}, _this.defaultState);
    return _this;
  }

  (0, _createClass3.default)(ErrorBoundary, [{
    key: 'componentDidCatch',
    value: function componentDidCatch(error, info) {
      this.setState({ uncaughtError: { error: error, info: info } });
    }
  }]);
  return ErrorBoundary;
}(_react2.default.Component);

ErrorBoundary.propTypes = {
  children: _propTypes2.default.node
};
ErrorBoundary.defaultProps = {
  children: null
};
ErrorBoundary.defaultState = {
  uncaughtError: null
};
exports.default = ErrorBoundary;