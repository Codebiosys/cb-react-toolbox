'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reduxTestUtils = require('redux-test-utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ProtectedComponent = require('./ProtectedComponent');

var _ProtectedComponent2 = _interopRequireDefault(_ProtectedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = jest.fn();
var children = _react2.default.createElement(
  'div',
  null,
  'children'
);

describe('The Messenger notifier', function () {
  var defaultStore = {
    app: {
      auth: {
        authenticated: true
      }
    }
  };
  var unAuthdefaultStore = {
    app: {
      auth: {
        authenticated: false
      }
    }
  };
  var store = void 0;
  var wrapper = void 0;
  beforeEach(function () {
    store = (0, _reduxTestUtils.createMockStore)(defaultStore);
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _ProtectedComponent2.default,
      { authenticate: authenticate },
      children
    ), { context: { store: store },
      childContextTypes: { store: _propTypes2.default.object }
    });
  });

  it('renders', function () {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders to null if not authenticated', function () {
    store = (0, _reduxTestUtils.createMockStore)(unAuthdefaultStore);
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _ProtectedComponent2.default,
      { authenticate: authenticate },
      children
    ), { context: { store: store },
      childContextTypes: { store: _propTypes2.default.object }
    });
    expect(wrapper).toMatchSnapshot();
  });
});