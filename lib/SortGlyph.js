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

require('bootstrap/dist/css/bootstrap.css');

require('react-datetime/css/react-datetime.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortGlyph = function SortGlyph(_ref) {
  var field = _ref.field,
      orderBy = _ref.orderBy,
      type = _ref.type,
      reverse = _ref.reverse,
      changeSortOrder = _ref.changeSortOrder,
      reverseSortOrder = _ref.reverseSortOrder;

  var updateSort = function updateSort() {
    if ((0, _lodash.toUpper)(field) === (0, _lodash.toUpper)(orderBy)) {
      reverseSortOrder(reverse);
    } else {
      changeSortOrder(field);
    }
  };
  return _react2.default.createElement(_reactBootstrap.Glyphicon, {
    onClick: function onClick() {
      return updateSort();
    },
    glyph: (0, _lodash.toUpper)(field) === (0, _lodash.toUpper)(orderBy) && reverse ? 'sort-by-' + type + '-alt' : 'sort-by-' + type,
    className: (0, _lodash.toUpper)(field) === (0, _lodash.toUpper)(orderBy) ? 'text-success' : ''
  });
};

SortGlyph.defaultProps = {
  orderBy: '',
  reverse: false,
  type: 'alphabet'
};

exports.default = SortGlyph;