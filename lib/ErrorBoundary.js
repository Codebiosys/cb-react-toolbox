'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorBoundary = function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    _classCallCheck(this, ErrorBoundary);

    var _this = _possibleConstructorReturn(this, (ErrorBoundary.__proto__ || Object.getPrototypeOf(ErrorBoundary)).call(this));

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

    _this.state = _extends({}, _this.defaultState);
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: 'componentDidCatch',
    value: function componentDidCatch(error, info) {
      this.setState({ uncaughtError: { error: error, info: info } });
    }
  }]);

  return ErrorBoundary;
}(_react2.default.Component);

ErrorBoundary.defaultProps = {
  children: null
};
ErrorBoundary.defaultState = {
  uncaughtError: null
};
exports.default = ErrorBoundary;