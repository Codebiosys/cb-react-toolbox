import moment from 'moment';
/**
 * @desc A validator that checks existence.
 * @param {string} value - A value to hceck.
 * @returns {string} A display message if the check fails, otherwise undefined.
 */

export const required = value => (value ? undefined : 'Required'); //eslint-disable-line

// TODO: remove eslint-disable-line when there is more than one entry in this file
export const isValidDate = value =>(moment.isMoment(value) ? undefined : `${value} is not a valid Date`); //eslint-disable-line
