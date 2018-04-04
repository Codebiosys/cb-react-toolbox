'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _FileUploadField = require('./FileUploadField');

var _FileUploadField2 = _interopRequireDefault(_FileUploadField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentProps = {};

describe('The File Upload Field', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_FileUploadField2.default, componentProps));
  });
  it('renders', function () {
    expect(wrapper).toMatchSnapshot();
  });
});