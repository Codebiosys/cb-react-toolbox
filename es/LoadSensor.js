'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactVisibilitySensor = require('react-visibility-sensor');

var _reactVisibilitySensor2 = _interopRequireDefault(_reactVisibilitySensor);

var _reactFa = require('react-fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadSensor = function (_Component) {
  (0, _inherits3.default)(LoadSensor, _Component);

  function LoadSensor(props) {
    (0, _classCallCheck3.default)(this, LoadSensor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoadSensor.__proto__ || (0, _getPrototypeOf2.default)(LoadSensor)).call(this, props));

    _this.componentDidMount = function () {
      _this.setState({ active: true });
    };

    _this.loadMore = function (isVisible) {
      var _this$props = _this.props,
          loading = _this$props.loading,
          hasNextPage = _this$props.hasNextPage,
          loadMoreEntries = _this$props.loadMoreEntries;

      if (isVisible && !loading && hasNextPage) {
        _this.setState({ active: false });
        loadMoreEntries().then(function () {
          _this.setState({ active: true });
        }).catch(function (e) {
          console.log(e); // eslint-disable-line
        });
      }
    };

    _this.render = function () {
      var _this$props2 = _this.props,
          loading = _this$props2.loading,
          hasNextPage = _this$props2.hasNextPage;

      if (loading) {
        return _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(_reactFa.Icon, { spin: true, name: 'refresh', size: '2x' })
        );
      } else if (hasNextPage === true) {
        return _react2.default.createElement(_reactVisibilitySensor2.default, {
          active: _this.state.active,
          onChange: _this.loadMore,
          delayedCall: true
        });
      }
      return _react2.default.createElement(
        'center',
        { width: '100%' },
        'All content loaded'
      );
    };

    _this.state = { active: false };
    return _this;
  }

  return LoadSensor;
}(_react.Component);

LoadSensor.propTypes = {
  loading: _propTypes2.default.bool,
  hasNextPage: _propTypes2.default.bool,
  loadMoreEntries: _propTypes2.default.func.isRequired
};
LoadSensor.defaultProps = {
  loading: false,
  hasNextPage: null
};
exports.default = LoadSensor;