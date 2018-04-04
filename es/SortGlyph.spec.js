'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _SortGlyph = require('./SortGlyph');

var _SortGlyph2 = _interopRequireDefault(_SortGlyph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeSortOrder = jest.fn();
var reverseSortOrder = jest.fn();

var componentProps = {
  field: 'test',
  orderBy: 'notTest',
  type: 'alphabet',
  reverse: false,
  changeSortOrder: changeSortOrder,
  reverseSortOrder: reverseSortOrder
};

describe('The Sort Glyph', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SortGlyph2.default, componentProps));
  });

  it('renders', function () {
    expect(wrapper).toMatchSnapshot();
  });

  it('supports alternative sort glyphs', function () {
    var altProps = _extends({}, componentProps, { type: 'test' });
    var altWrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SortGlyph2.default, altProps));
    expect(altWrapper.prop('glyph')).toEqual('sort-by-' + altProps.type);
  });

  it('Highlights the glyph when the orderBy matches the field', function () {
    var matchingProps = _extends({}, componentProps, { orderBy: 'test' });
    var matchedwrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SortGlyph2.default, matchingProps));
    expect(matchedwrapper.prop('className')).toEqual('text-success');
  });

  it('Displays the alt glyph when the orderBy matches the field and reverse is true', function () {
    var reversedProps = _extends({}, componentProps, { orderBy: 'test', reverse: true });
    var reversedWrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SortGlyph2.default, reversedProps));
    expect(reversedWrapper.prop('glyph')).toEqual('sort-by-' + reversedProps.type + '-alt');
  });
  it('Orders the data when the sort button is pressed', function () {
    wrapper.simulate('click');
    expect(changeSortOrder).toHaveBeenCalledTimes(1);
    expect(reverseSortOrder).toHaveBeenCalledTimes(0);
  });

  it('Reverse orders the data when the sort button is pressed for the current sort', function () {
    var matchingProps = _extends({}, componentProps, { orderBy: 'test' });
    var matchedwrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SortGlyph2.default, matchingProps));
    matchedwrapper.simulate('click');
    expect(changeSortOrder).toHaveBeenCalledTimes(0);
    expect(reverseSortOrder).toHaveBeenCalledTimes(1);
  });
});