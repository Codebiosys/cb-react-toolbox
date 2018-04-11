'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YES = exports.SORTA = exports.NO = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFa = require('react-fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NO = exports.NO = 'no';
var SORTA = exports.SORTA = 'sorta';
var YES = exports.YES = 'checked';

var STATUS_CHOICES = [NO, SORTA, YES];

var propTypes = {
  tabIndex: _propTypes2.default.number,
  checked: _propTypes2.default.oneOf(STATUS_CHOICES).isRequired,
  onClick: _propTypes2.default.func.isRequired
};

var defaultProps = {
  tabIndex: 0
};

/**
 * A faux check box
 *
 * @typedef {Component} ChackBox
 */
var ChackBox = function ChackBox(_ref) {
  var tabIndex = _ref.tabIndex,
      checked = _ref.checked,
      onClick = _ref.onClick;

  var icon = void 0;
  var ariaChecked = void 0;
  switch (checked) {
    case NO:
      icon = 'square';
      ariaChecked = 'false';
      break;
    case SORTA:
      icon = 'minus-square';
      ariaChecked = 'mixed';
      break;
    case YES:
      icon = 'check-square';
      ariaChecked = 'true';
      break;
    default:
      icon = 'exclamation-circle';
      break;
  }

  return _react2.default.createElement(
    'div',
    {
      style: {
        cursor: 'pointer',
        display: 'inline-block'
      },
      className: 'chackbox',
      role: 'checkbox',
      'aria-checked': ariaChecked,
      tabIndex: tabIndex,
      onClick: onClick
    },
    _react2.default.createElement(_reactFa.Icon, { name: icon })
  );
};

ChackBox.defaultProps = defaultProps;

exports.default = ChackBox;