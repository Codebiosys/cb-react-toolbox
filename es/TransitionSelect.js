'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactFa = require('react-fa');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  currentState: _propTypes2.default.shape({
    codename: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  }).isRequired,
  availableTransitions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    codename: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    implicit: _propTypes2.default.bool.isRequired,
    target: _propTypes2.default.shape({
      codename: _propTypes2.default.string.isRequired,
      label: _propTypes2.default.string.isRequired
    }).isRequired
  })),
  onSelect: _propTypes2.default.func.isRequired
};

var defaultProps = {
  availableTransitions: []
};

/**
 * @typedef {React.Component} TransitionSelect
 *
 * This component composes a Bootstrap <DropdownButton /> to use for transitioning
 * states for an object.
 *
 * @param {object} currentState - the current state to display as the Dropdown title
 * @param {object[]} availableTransitions - list of available transitions for the current object
 * @param {Function} onSelect - callback to invoke when a value is clicked.
 *    The function will be be passed (eventKey, event).
 */
var TransitionSelect = function TransitionSelect(_ref) {
  var currentState = _ref.currentState,
      availableTransitions = _ref.availableTransitions,
      onSelect = _ref.onSelect;

  if (availableTransitions && availableTransitions.length) {
    var transitions = (0, _lodash.filter)(availableTransitions, function (transition) {
      return !transition.implicit;
    });
    return _react2.default.createElement(
      _reactBootstrap.DropdownButton,
      {
        title: currentState.label,
        id: 'transition-select-' + currentState.codename
      },
      transitions.map(function (transition) {
        return _react2.default.createElement(
          _reactBootstrap.MenuItem,
          { key: (0, _lodash.uniqueId)(), eventKey: transition.codename, onSelect: onSelect },
          transition.label,
          ' ',
          _react2.default.createElement(_reactFa.Icon, { name: 'arrow-right' }),
          ' ',
          _react2.default.createElement(
            _reactBootstrap.Label,
            null,
            transition.target.label
          )
        );
      })
    );
  }
  return _react2.default.createElement(
    _reactBootstrap.Button,
    { disabled: true },
    currentState.label
  );
};

TransitionSelect.propTypes = propTypes;
TransitionSelect.defaultProps = defaultProps;

exports.default = TransitionSelect;