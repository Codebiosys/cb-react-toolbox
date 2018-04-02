import moment from 'moment';

import {
  required,
  isValidDate,
} from './validators';


describe('The Required validator', () => {
  it('returns undefined when the value exists', () => {
    expect(required('foo')).toEqual(undefined);
  });
  it('returns \'required\' when the value does not exist', () => {
    expect(required(null)).toEqual('Required');
  });
});


describe('The Date validator', () => {
  it('returns undefined when the value is a date', () => {
    expect(isValidDate(moment())).toEqual(undefined);
  });
  it('returns \'Not a Valid Date\' when the value is not a date', () => {
    expect(isValidDate('foo')).toEqual('foo is not a valid Date');
  });
});
