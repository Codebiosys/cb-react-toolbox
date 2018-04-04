'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateNormalizeFactory = exports.phoneFormatter = exports.dateFormatter = exports.institutionFormatter = exports.patientFormatter = exports.testFormatter = exports.clientFormatter = undefined;

var _lodash = require('lodash');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * @desc A Display format helper function that formats client object data in an
  * easy to display format.
 * @param {{prefix: string, firstName: string, lastName: string, suffix: string}} client
          Physician object to be parsed.
 * @returns {string} A formatted string to be displayed to the user.
 */

var prefixLookup = function prefixLookup(prefix) {
  switch (prefix) {
    case 'DR':
      return 'Dr.';
    case 'MR':
      return 'Mr.';
    case 'MS':
      return 'Ms.';
    case 'MRS':
      return 'Mrs.';
    case null:
      return '';
    default:
      return prefix;
  }
};

var clientFormatter = exports.clientFormatter = function clientFormatter(client) {
  if (!client) {
    return '';
  }
  if (!client.suffix) {
    return prefixLookup(client.prefix) + ' ' + client.lastName + ', ' + client.firstName;
  }
  return prefixLookup(client.prefix) + ' ' + client.lastName + ', ' + client.firstName + ', ' + client.suffix;
};

/**
 * @desc A Display format helper function that formats a list of Test objects in an
 * easy to display format.
 * @param {Array.{name: string}} tests - An array of test objects that have a name property
 * @returns {string} A string of test names separated by a return carriage.
 */
var testFormatter = exports.testFormatter = function testFormatter(tests) {
  return (0, _lodash.join)((0, _lodash.map)(tests, function (test) {
    return test.name;
  }), ',\n');
};

/**
 * @desc A Display format helper function that formats Patient object data in an
 * easy to display format.
 * @param {{firstName: string, lastName: string}} patient - Patient object to be parsed
 * @returns {string} A formatted string to be displayed to the user.
 */
var patientFormatter = exports.patientFormatter = function patientFormatter(patient) {
  return (0, _lodash.join)((0, _lodash.filter)([patient.lastName, patient.firstName], function (val) {
    return !(0, _lodash.isEmpty)(val);
  }), ', ');
};
// (patient ? console.log(patient); return `${patient.lastName}, ${patient.firstName}` : '');
//
/**
 * @desc A display format helper function that formats Institution object data in an
 * easy to display format.
 * @param {{name: string}} institution - Institution object to be parsed
 * @returns {string} A formatted string to be displayed to the user.
 */
var institutionFormatter = exports.institutionFormatter = function institutionFormatter(institution) {
  return institution.name || '';
};

/**
 * A Display format helper function that formats an iso date string .
 * @param {string} dateToFormat - A date to format in a regulatory compliant manner.
 * @returns {string} A formatted string to be displayed to the user.
 */
var dateFormatter = exports.dateFormatter = function dateFormatter(dateToFormat) {
  return (0, _moment2.default)(dateToFormat).format('DD/MMM/YYYY');
};

/**
 * @desc A Display format helper function that formats a phone number for easy entry.
 * @param {string} value - A value to format.
 * @returns {string} A formatted string to be displayed to the user. A plus sign (+)
 * indicates an international number that should not be formatted. An x designates
 * an extension that should be included as is in the number.
 */
var phoneFormatter = exports.phoneFormatter = function phoneFormatter(value) {
  if (!value) {
    return value;
  }
  var onlyNums = value.replace(/[^\dx]/g, '');
  var numAndExtension = (0, _lodash.split)(onlyNums, 'x');
  var number = (0, _lodash.head)(numAndExtension);
  var extension = void 0;
  if (numAndExtension.length > 1) {
    extension = (0, _lodash.join)((0, _lodash.tail)(numAndExtension), 'x');
  }
  var retnum = void 0;
  if (value[0] === '+') {
    retnum = '+' + number;
  } else if (number.length <= 3) {
    retnum = number;
  } else if (number.length <= 7) {
    retnum = number.slice(0, 3) + '-' + number.slice(3);
  } else {
    retnum = number.slice(0, 3) + '-' + number.slice(3, 6) + '-' + number.slice(6, 10);
  }
  if (numAndExtension.length > 1) {
    return retnum + 'x' + extension;
  }
  return retnum;
};

var VALID_DATE_FORMATS = ['DD/MMM/YYYY', 'DD-MMM-YYYY', 'M-D-YYYY', 'M/D/YYYY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'];

/**
 * @desc Factory that returns a Display format helper function that
 * matches a date format and returns a moment.
 * @param {Array.{string}} validFormats - the momentjs formats to match
 * @returns {function} A normalizing function that uses the valid formats, and
 * and attempts to create a moment that can be formatted. Otherwise strip and limit.
 *
 */
var dateNormalizeFactory = exports.dateNormalizeFactory = function dateNormalizeFactory() {
  var validFormats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : VALID_DATE_FORMATS;
  return function (value) {
    if (!value) {
      return value;
    }
    if (_moment2.default.isMoment(value)) {
      return value;
    }
    if ((0, _moment2.default)(value, validFormats, true).isValid()) {
      return (0, _moment2.default)(value, validFormats);
    }
    var newVal = value.replace(/[HhIiKkQqWwXxZz\s]/g, '');
    if (newVal.length > 11) {
      return newVal.slice(0, 11);
    }
    return newVal;
  };
};