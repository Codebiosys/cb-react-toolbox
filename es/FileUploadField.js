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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

require('./FileUploadField.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FAKE_PATH_PATTERN = /C:\\fakepath\\/i;

var FileUploadField = function (_React$Component) {
  (0, _inherits3.default)(FileUploadField, _React$Component);

  function FileUploadField(props) {
    (0, _classCallCheck3.default)(this, FileUploadField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FileUploadField.__proto__ || (0, _getPrototypeOf2.default)(FileUploadField)).call(this, props));

    _this.componentWillReceiveProps = function (_ref) {
      var value = _ref.value;

      // Reset the filename when props change.
      if (!value) {
        _this.setState((0, _extends3.default)({}, _this.state, {
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

FileUploadField.propTypes = {
  placeholder: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};
FileUploadField.defaultProps = {
  value: '',
  placeholder: '',
  onChange: function onChange() {}
};
exports.default = FileUploadField;