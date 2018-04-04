'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _formatters = require('./formatters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientData = {
  firstName: 'foo',
  lastName: 'bar',
  suffix: 'baz',
  prefix: 'Dr.'
};

var testData = [{ name: 'Test 1' }, { name: 'Test 2' }, { name: 'Test 3' }];

var patientData = {
  firstName: 'foo',
  lastName: 'bar'
};

var institutionData = {
  name: 'the institution'
};

describe('The Physician Formatter', function () {
  var formattedPhysician = void 0;
  beforeEach(function () {
    formattedPhysician = (0, _formatters.clientFormatter)(clientData);
  });
  it('Formats the client name properly', function () {
    expect(formattedPhysician).toEqual('Dr. bar, foo, baz');
  });
});

describe('The Test Formatter', function () {
  var formattedTests = void 0;
  beforeEach(function () {
    formattedTests = (0, _formatters.testFormatter)(testData);
  });
  it('Formats the client name properly', function () {
    expect(formattedTests).toEqual('Test 1,\nTest 2,\nTest 3');
  });
});

describe('The Patient Formatter', function () {
  var formattedPatient = void 0;
  beforeEach(function () {
    formattedPatient = (0, _formatters.patientFormatter)(patientData);
  });
  it('Formats the client name properly', function () {
    expect(formattedPatient).toEqual('bar, foo');
  });
  it('defaults to empty', function () {
    formattedPatient = (0, _formatters.patientFormatter)({});
    expect(formattedPatient).toEqual('');
  });
});

describe('The Institution Formatter', function () {
  var formattedInstitution = void 0;
  beforeEach(function () {
    formattedInstitution = (0, _formatters.institutionFormatter)(institutionData);
  });
  it('Formats the institution name properly', function () {
    expect(formattedInstitution).toEqual('the institution');
  });
  it('defaults to empty', function () {
    formattedInstitution = (0, _formatters.institutionFormatter)({});
    expect(formattedInstitution).toEqual('');
  });
});

describe('The Date Formatter', function () {
  var formattedDate = void 0;
  beforeEach(function () {
    formattedDate = (0, _formatters.dateFormatter)('2017-10-10T09:00:00');
  });
  it('Formats the client name properly', function () {
    expect(formattedDate).toEqual('10/Oct/2017');
  });
});

describe('The Date Normalizer', function () {
  var normalizer = void 0;
  beforeEach(function () {
    var theFormats = ['MM/DD/YYYY', 'DD/MMM/YYYY'];
    normalizer = (0, _formatters.dateNormalizeFactory)(theFormats);
  });

  it('returns a null for a null', function () {
    expect(normalizer(null)).toBe(null);
    expect(normalizer(undefined)).toBe(undefined);
  });

  it('returns a moment object', function () {
    var today = (0, _moment2.default)();
    expect(normalizer(today)).toBe(today);
  });

  it('returns a moment for a correct string', function () {
    var today = '02/01/2018';
    var normalized = normalizer(today);
    expect(_moment2.default.isMoment(normalized)).toBe(true);
    expect(normalized.format('YYYY-MM-DD')).toEqual('2018-02-01');
  });

  it('returns a moment for a correct string', function () {
    var today = '02/01/2018';
    var normalized = normalizer(today);
    expect(_moment2.default.isMoment(normalized)).toBe(true);
    expect(normalized.format('YYYY-MM-DD')).toEqual('2018-02-01');
  });

  it('strips spaces and non dateish characters', function () {
    var today = '02 / zzz';
    var normalized = normalizer(today);
    expect(_moment2.default.isMoment(normalized)).toBe(false);
    expect(normalized).toEqual('02/');
  });
  it('limits the number of characters', function () {
    var today = '01/345/78901234';
    var normalized = normalizer(today);
    expect(_moment2.default.isMoment(normalized)).toBe(false);
    expect(normalized).toEqual('01/345/7890');
  });
});

describe('The Phone Formatter', function () {
  it('Formats local numbers', function () {
    var formatted = (0, _formatters.phoneFormatter)('1111111111');
    expect(formatted).toEqual('111-111-1111');
  });
  it('formats short numbers without the dashes', function () {
    var formatted = (0, _formatters.phoneFormatter)('111');
    expect(formatted).toEqual('111');
  });
  it('adds the dash to a number with 4+ characters', function () {
    var formatted = (0, _formatters.phoneFormatter)('1111');
    expect(formatted).toEqual('111-1');
  });
  it('adds two dashes to a number with 8+ characters', function () {
    var formatted = (0, _formatters.phoneFormatter)('11111111');
    expect(formatted).toEqual('111-111-11');
  });
  it('limits local numbers to 10 digits', function () {
    var formatted = (0, _formatters.phoneFormatter)('1111111111111111111');
    expect(formatted).toEqual('111-111-1111');
  });
  it('allows international numbers', function () {
    var formatted = (0, _formatters.phoneFormatter)('+1111111111111111111');
    expect(formatted).toEqual('+1111111111111111111');
  });
  it('allows international numbers with extensions', function () {
    var formatted = (0, _formatters.phoneFormatter)('+1111111111111111111x111');
    expect(formatted).toEqual('+1111111111111111111x111');
  });
  it('allows extensions', function () {
    var formatted = (0, _formatters.phoneFormatter)('1111111111x1111');
    expect(formatted).toEqual('111-111-1111x1111');
  });
  it('does not format empty values', function () {
    var formatted = (0, _formatters.phoneFormatter)('');
    expect(formatted).toEqual('');
  });
});