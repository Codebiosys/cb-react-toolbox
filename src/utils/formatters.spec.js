import moment from 'moment';

import {
  clientFormatter,
  testFormatter,
  patientFormatter,
  dateFormatter,
  institutionFormatter,
  phoneFormatter,
  dateNormalizeFactory,
} from './formatters';

const clientData = {
  firstName: 'foo',
  lastName: 'bar',
  suffix: 'baz',
  prefix: 'Dr.',
};

const testData = [
  { name: 'Test 1' },
  { name: 'Test 2' },
  { name: 'Test 3' },

];

const patientData = {
  firstName: 'foo',
  lastName: 'bar',
};

const institutionData = {
  name: 'the institution',
};

describe('The Physician Formatter', () => {
  let formattedPhysician;
  beforeEach(() => {
    formattedPhysician = clientFormatter(clientData);
  });
  it('Formats the client name properly', () => {
    expect(formattedPhysician).toEqual('Dr. bar, foo, baz');
  });
});

describe('The Test Formatter', () => {
  let formattedTests;
  beforeEach(() => {
    formattedTests = testFormatter(testData);
  });
  it('Formats the client name properly', () => {
    expect(formattedTests).toEqual('Test 1,\nTest 2,\nTest 3');
  });
});

describe('The Patient Formatter', () => {
  let formattedPatient;
  beforeEach(() => {
    formattedPatient = patientFormatter(patientData);
  });
  it('Formats the client name properly', () => {
    expect(formattedPatient).toEqual('bar, foo');
  });
  it('defaults to empty', () => {
    formattedPatient = patientFormatter({});
    expect(formattedPatient).toEqual('');
  });
});

describe('The Institution Formatter', () => {
  let formattedInstitution;
  beforeEach(() => {
    formattedInstitution = institutionFormatter(institutionData);
  });
  it('Formats the institution name properly', () => {
    expect(formattedInstitution).toEqual('the institution');
  });
  it('defaults to empty', () => {
    formattedInstitution = institutionFormatter({});
    expect(formattedInstitution).toEqual('');
  });
});

describe('The Date Formatter', () => {
  let formattedDate;
  beforeEach(() => {
    formattedDate = dateFormatter('2017-10-10T09:00:00');
  });
  it('Formats the client name properly', () => {
    expect(formattedDate).toEqual('10/Oct/2017');
  });
});

describe('The Date Normalizer', () => {
  let normalizer;
  beforeEach(() => {
    const theFormats = ['MM/DD/YYYY', 'DD/MMM/YYYY'];
    normalizer = dateNormalizeFactory(theFormats);
  });

  it('returns a null for a null', () => {
    expect(normalizer(null)).toBe(null);
    expect(normalizer(undefined)).toBe(undefined);
  });

  it('returns a moment object', () => {
    const today = moment();
    expect(normalizer(today)).toBe(today);
  });

  it('returns a moment for a correct string', () => {
    const today = '02/01/2018';
    const normalized = normalizer(today);
    expect(moment.isMoment(normalized)).toBe(true);
    expect(normalized.format('YYYY-MM-DD')).toEqual('2018-02-01');
  });

  it('returns a moment for a correct string', () => {
    const today = '02/01/2018';
    const normalized = normalizer(today);
    expect(moment.isMoment(normalized)).toBe(true);
    expect(normalized.format('YYYY-MM-DD')).toEqual('2018-02-01');
  });

  it('strips spaces and non dateish characters', () => {
    const today = '02 / zzz';
    const normalized = normalizer(today);
    expect(moment.isMoment(normalized)).toBe(false);
    expect(normalized).toEqual('02/');
  });
  it('limits the number of characters', () => {
    const today = '01/345/78901234';
    const normalized = normalizer(today);
    expect(moment.isMoment(normalized)).toBe(false);
    expect(normalized).toEqual('01/345/7890');
  });
});

describe('The Phone Formatter', () => {
  it('Formats local numbers', () => {
    const formatted = phoneFormatter('1111111111');
    expect(formatted).toEqual('111-111-1111');
  });
  it('formats short numbers without the dashes', () => {
    const formatted = phoneFormatter('111');
    expect(formatted).toEqual('111');
  });
  it('adds the dash to a number with 4+ characters', () => {
    const formatted = phoneFormatter('1111');
    expect(formatted).toEqual('111-1');
  });
  it('adds two dashes to a number with 8+ characters', () => {
    const formatted = phoneFormatter('11111111');
    expect(formatted).toEqual('111-111-11');
  });
  it('limits local numbers to 10 digits', () => {
    const formatted = phoneFormatter('1111111111111111111');
    expect(formatted).toEqual('111-111-1111');
  });
  it('allows international numbers', () => {
    const formatted = phoneFormatter('+1111111111111111111');
    expect(formatted).toEqual('+1111111111111111111');
  });
  it('allows international numbers with extensions', () => {
    const formatted = phoneFormatter('+1111111111111111111x111');
    expect(formatted).toEqual('+1111111111111111111x111');
  });
  it('allows extensions', () => {
    const formatted = phoneFormatter('1111111111x1111');
    expect(formatted).toEqual('111-111-1111x1111');
  });
  it('does not format empty values', () => {
    const formatted = phoneFormatter('');
    expect(formatted).toEqual('');
  });
});
