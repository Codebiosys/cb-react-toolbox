'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _validators = require('./validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The Required validator', function () {
  it('returns undefined when the value exists', function () {
    expect((0, _validators.required)('foo')).toEqual(undefined);
  });
  it('returns \'required\' when the value does not exist', function () {
    expect((0, _validators.required)(null)).toEqual('Required');
  });
});

describe('The Date validator', function () {
  it('returns undefined when the value is a date', function () {
    expect((0, _validators.isValidDate)((0, _moment2.default)())).toEqual(undefined);
  });
  it('returns \'Not a Valid Date\' when the value is not a date', function () {
    expect((0, _validators.isValidDate)('foo')).toEqual('foo is not a valid Date');
  });
});