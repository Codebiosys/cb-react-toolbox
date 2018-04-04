'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

require('./FileUploadField.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FAKE_PATH_PATTERN = /C:\\fakepath\\/i;

var FileUploadField = function (_React$Component) {
  _inherits(FileUploadField, _React$Component);

  function FileUploadField(props) {
    _classCallCheck(this, FileUploadField);

    var _this = _possibleConstructorReturn(this, (FileUploadField.__proto__ || Object.getPrototypeOf(FileUploadField)).call(this, props));

    _this.componentWillReceiveProps = function (_ref) {
      var value = _ref.value;

      // Reset the filename when props change.
      if (!value) {
        _this.setState(_extends({}, _this.state, {
          filename: ''
        }));
        _this.formInput.value = '';
      }
    };

    _this.handleBrowse = function () {
      _this.formInput.click();
    };

    _this.handleFileWasUpdated = function () {
      var filename = _this.formInput.value.replace(FAKE_PATH_PATTERN, '');
      _this.setState({ filename: filename });

      // Alert parent components.
      _this.props.onChange(_this.formInput.files[0]);
    };

    _this.render = function () {
      var placeholder = _this.props.placeholder;
      var filename = _this.state.filename;

      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement('input', {
          type: 'file',
          name: 'file',
          className: 'file',
          onChange: _this.handleFileWasUpdated,
          ref: function ref(e) {
            _this.formInput = e;
          }
        }),
        _react2.default.createElement(
          'div',
          { className: 'input-group col-xs-12' },
          _react2.default.createElement(
            'span',
            { className: 'input-group-addon' },
            _react2.default.createElement('i', { className: 'glyphicon glyphicon-file' })
          ),
          _react2.default.createElement(
            'span',
            {
              type: 'text',
              className: 'form-control text-center input-lg file-input-text-input',
              disabled: true,
              readOnly: true
            },
            filename || _react2.default.createElement(
              'span',
              { className: 'text-muted' },
              placeholder
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'input-group-btn' },
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'browse btn btn-default input-lg', onClick: _this.handleBrowse },
              _react2.default.createElement('i', { className: 'glyphicon glyphicon-search' }),
              '\xA0 Browse'
            )
          )
        )
      );
    };

    _this.state = {
      filename: props.value.name || props.value
    };
    return _this;
  }

  return FileUploadField;
}(_react2.default.Component);

FileUploadField.defaultProps = {
  value: '',
  placeholder: '',
  onChange: function onChange() {}
};
exports.default = FileUploadField;