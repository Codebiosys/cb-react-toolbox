import { map, join, split, head, tail, filter, isEmpty } from 'lodash';
import moment from 'moment';

/**
  * @desc A Display format helper function that formats client object data in an
  * easy to display format.
 * @param {{prefix: string, firstName: string, lastName: string, suffix: string}} client
          Physician object to be parsed.
 * @returns {string} A formatted string to be displayed to the user.
 */

const prefixLookup = (prefix) => {
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

export const clientFormatter = (client) => {
  if (!client) {
    return '';
  }
  if (!client.suffix) {
    return `${prefixLookup(client.prefix)} ${client.lastName}, ${client.firstName}`;
  }
  return `${prefixLookup(client.prefix)} ${client.lastName}, ${client.firstName}, ${client.suffix}`;
};

/**
 * @desc A Display format helper function that formats a list of Test objects in an
 * easy to display format.
 * @param {Array.{name: string}} tests - An array of test objects that have a name property
 * @returns {string} A string of test names separated by a return carriage.
 */
export const testFormatter = tests => join(map(tests, test => test.name), ',\n');

/**
 * @desc A Display format helper function that formats Patient object data in an
 * easy to display format.
 * @param {{firstName: string, lastName: string}} patient - Patient object to be parsed
 * @returns {string} A formatted string to be displayed to the user.
 */
export const patientFormatter = patient => join(filter([patient.lastName, patient.firstName], val => !isEmpty(val)), ', ');
// (patient ? console.log(patient); return `${patient.lastName}, ${patient.firstName}` : '');
//
/**
 * @desc A display format helper function that formats Institution object data in an
 * easy to display format.
 * @param {{name: string}} institution - Institution object to be parsed
 * @returns {string} A formatted string to be displayed to the user.
 */
export const institutionFormatter = institution => institution.name || '';

/**
 * A Display format helper function that formats an iso date string .
 * @param {string} dateToFormat - A date to format in a regulatory compliant manner.
 * @returns {string} A formatted string to be displayed to the user.
 */
export const dateFormatter = dateToFormat => moment(dateToFormat).format('DD/MMM/YYYY');

/**
 * @desc A Display format helper function that formats a phone number for easy entry.
 * @param {string} value - A value to format.
 * @returns {string} A formatted string to be displayed to the user. A plus sign (+)
 * indicates an international number that should not be formatted. An x designates
 * an extension that should be included as is in the number.
 */
export const phoneFormatter = (value) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\dx]/g, '');
  const numAndExtension = split(onlyNums, 'x');
  const number = head(numAndExtension);
  let extension;
  if (numAndExtension.length > 1) {
    extension = join(tail(numAndExtension), 'x');
  }
  let retnum;
  if (value[0] === '+') {
    retnum = `+${number}`;
  } else if (number.length <= 3) {
    retnum = number;
  } else if (number.length <= 7) {
    retnum = `${number.slice(0, 3)}-${number.slice(3)}`;
  } else {
    retnum = `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
  }
  if (numAndExtension.length > 1) {
    return `${retnum}x${extension}`;
  }
  return retnum;
};

const VALID_DATE_FORMATS = ['DD/MMM/YYYY', 'DD-MMM-YYYY', 'M-D-YYYY', 'M/D/YYYY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'];

/**
 * @desc Factory that returns a Display format helper function that
 * matches a date format and returns a moment.
 * @param {Array.{string}} validFormats - the momentjs formats to match
 * @returns {function} A normalizing function that uses the valid formats, and
 * and attempts to create a moment that can be formatted. Otherwise strip and limit.
 *
 */
export const dateNormalizeFactory = (validFormats = VALID_DATE_FORMATS) => (value) => {
  if (!value) {
    return value;
  }
  if (moment.isMoment(value)) {
    return value;
  }
  if (moment(value, validFormats, true).isValid()) {
    return moment(value, validFormats);
  }
  const newVal = value.replace(/[HhIiKkQqWwXxZz\s]/g, '');
  if (newVal.length > 11) {
    return newVal.slice(0, 11);
  }
  return newVal;
};
