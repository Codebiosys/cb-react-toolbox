'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _LoadSensor = require('./LoadSensor');

var _LoadSensor2 = _interopRequireDefault(_LoadSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentProps = {
  loading: false,
  hasNextPage: true,
  loadMoreEntries: jest.fn(function () {
    return _promise2.default.resolve();
  })
};

describe('The Load Sensor', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_LoadSensor2.default, componentProps));
  });

  it('renders', function () {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the spinner when loading', function () {
    var loadingProps = (0, _extends3.default)({}, componentProps, { loading: true });
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_LoadSensor2.default, loadingProps));
    expect(wrapper).toMatchSnapshot();
  });

  it('renders All Content Loaded when no more pages', function () {
    var allLoadedProps = (0, _extends3.default)({}, componentProps, { hasNextPage: false });
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_LoadSensor2.default, allLoadedProps));
    expect(wrapper).toMatchSnapshot();
  });

  it('calls load more entries when visible', function () {
    wrapper.instance().loadMore(true);
    expect(componentProps.loadMoreEntries).toHaveBeenCalled();
  });

  it('does not call load more entries when not visible', function () {
    wrapper.instance().loadMore(false);
    expect(componentProps.loadMoreEntries).not.toHaveBeenCalled();
  });
});