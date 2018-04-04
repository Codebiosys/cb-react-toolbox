'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reduxTestUtils = require('redux-test-utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNotificationSystemRedux = require('react-notification-system-redux');

var _reactNotificationSystemRedux2 = _interopRequireDefault(_reactNotificationSystemRedux);

var _Messenger = require('./Messenger');

var _Messenger2 = _interopRequireDefault(_Messenger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The Messenger notifier', function () {
  var wrapper = void 0;
  var mounted = void 0;
  var defaultStore = { notifications: [{ title: 'A Message' }] };
  var store = void 0;
  beforeEach(function () {
    store = (0, _reduxTestUtils.createMockStore)(defaultStore);
    mounted = (0, _enzyme.shallow)(_react2.default.createElement(_Messenger2.default, null), { context: { store: store },
      childContextTypes: { store: _propTypes2.default.object }
    });
    wrapper = mounted.find(_reactNotificationSystemRedux2.default);
  });

  it('renders', function () {
    expect(wrapper).toMatchSnapshot();
  });
  it('has current state notifications', function () {
    expect(wrapper.props()).toHaveProperty('notifications');
    expect(wrapper.props().notifications).toEqual(defaultStore.notifications);
  });
});