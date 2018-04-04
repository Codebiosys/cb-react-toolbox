'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidDate = exports.required = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc A validator that checks existence.
 * @param {string} value - A value to hceck.
 * @returns {string} A display message if the check fails, otherwise undefined.
 */

var required = exports.required = function required(value) {
  return value ? undefined : 'Required';
}; //eslint-disable-line

// TODO: remove eslint-disable-line when there is more than one entry in this file
var isValidDate = exports.isValidDate = function isValidDate(value) {
  return _moment2.default.isMoment(value) ? undefined : value + ' is not a valid Date';
}; //eslint-disable-line