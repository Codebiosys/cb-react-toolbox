'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactVisibilitySensor = require('react-visibility-sensor');

var _reactVisibilitySensor2 = _interopRequireDefault(_reactVisibilitySensor);

var _reactFa = require('react-fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadSensor = function (_Component) {
  _inherits(LoadSensor, _Component);

  function LoadSensor(props) {
    _classCallCheck(this, LoadSensor);

    var _this = _possibleConstructorReturn(this, (LoadSensor.__proto__ || Object.getPrototypeOf(LoadSensor)).call(this, props));

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