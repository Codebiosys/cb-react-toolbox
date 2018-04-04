'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _reactBootstrap = require('react-bootstrap');

var _LoadSensor = require('./LoadSensor');

var _LoadSensor2 = _interopRequireDefault(_LoadSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Generic React Component for displaying results from an Apollo Query.
 * This component supports query results that are pending, loading, errored,
 * and completed.
 *
 * To use this component, subclass it and override the 2 required methods:
 * - getTableRow: How should each row be rendered?
 * - getObjects: Which objects should the component use to map to the rows?
 */
var InfiniteTable = function (_React$Component) {
  _inherits(InfiniteTable, _React$Component);

  function InfiniteTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InfiniteTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InfiniteTable.__proto__ || Object.getPrototypeOf(InfiniteTable)).call.apply(_ref, [this].concat(args))), _this), _this.getTableHeader = function () {}, _this.getTableRow = function (object) {
      /* eslint no-unused-vars: 0 */
      throw new Error('Improperly configured. You forgot to override {getTableRow}.');
    }, _this.getObjects = function () {
      throw new Error('Improperly configured. You forgot to override {getObjects}.');
    }, _this.getNoRecordsElement = function () {
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { colSpan: '100%' },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { bsStyle: 'info' },
            _react2.default.createElement(
              _reactBootstrap.Panel.Heading,
              null,
              'No Records'
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Body,
              null,
              'No records match your criteria'
            )
          )
        )
      );
    }, _this.getErrorElement = function (error) {
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { colSpan: '100%' },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { bsStyle: 'danger' },
            _react2.default.createElement(
              _reactBootstrap.Panel.Heading,
              null,
              'Error'
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Body,
              null,
              error.message
            )
          )
        )
      );
    }, _this.getLoadingElement = function () {
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement('td', { colSpan: '100%' })
      );
    }, _this.getTableBodyContents = function (loading, error, objects) {
      if (error) {
        // In the case of an error, display nothing but the error.
        return _this.getErrorElement(error);
      } else if (objects.length) {
        // If we have results, then display them.
        return (0, _lodash.map)(objects, function (object) {
          return _this.getTableRow(object);
        });
      } else if (loading) {
        // No results are present yet, but the query is loading.
        return _this.getLoadingElement();
      }
      // No results are present, and the query has finished loading.
      return _this.getNoRecordsElement();
    }, _this.shouldShowCount = true, _this.render = function () {
      var _this$props = _this.props,
          children = _this$props.children,
          loading = _this$props.loading,
          error = _this$props.error,
          loadMoreEntries = _this$props.loadMoreEntries,
          hasNextPage = _this$props.hasNextPage,
          totalCount = _this$props.totalCount;


      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        children,
        _react2.default.createElement(
          _reactBootstrap.Table,
          { striped: true, bordered: true, hover: true },
          totalCount && _this.shouldShowCount ? _react2.default.createElement(
            'caption',
            null,
            'Displaying ',
            _this.getObjects().length,
            ' of ',
            totalCount,
            ' records'
          ) : null,
          _react2.default.createElement(
            'thead',
            null,
            _this.getTableHeader()
          ),
          _react2.default.createElement(
            'tbody',
            null,
            _this.getTableBodyContents(loading, error, _this.getObjects())
          ),
          _react2.default.createElement(
            'tfoot',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { colSpan: '100%' },
                _react2.default.createElement(_LoadSensor2.default, {
                  loadMoreEntries: loadMoreEntries,
                  hasNextPage: hasNextPage,
                  loading: loading
                })
              )
            )
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* Table Methods */

  /**
   * Override this method to provide a custom Table Header for your table.
   * This method is optional, but by default, no table header will be shown.
   */


  /**
   * Subclasses should override this method to return an element to display for
   * the given object. This element should begin and end with <tr>.
   */


  /**
   * Subclasses should override this method to return the list of objects that
   * are used to create the rows for the table. This is also the results that
   * will be used in the total count calculations.
   */


  /**
   * Subclasses should override this method to provide custom render behavior
   * when no records are found to display in the table.
   */


  /**
   * Subclasses should override this method to provide custom render behavior
   * when an error was encountered while fetching the results for the table.
   */


  /**
   * Subclasses should override this method to provide custom render behavior
   * when the table is loading new results, and no current results are available.
   */


  /**
   * Override this value to determine whether or not to show the total count
   * information at the top of the table.
   */


  /* Lifecycle Methods */

  return InfiniteTable;
}(_react2.default.Component);

InfiniteTable.propTypes = {
  children: _propTypes2.default.node,
  loading: _propTypes2.default.bool.isRequired,
  error: _propTypes2.default.object,
  loadMoreEntries: _propTypes2.default.func.isRequired,
  hasNextPage: _propTypes2.default.bool,
  totalCount: _propTypes2.default.number
};
InfiniteTable.defaultProps = {
  children: null,
  error: null,
  hasNextPage: false,
  totalCount: undefined
};
exports.default = InfiniteTable;