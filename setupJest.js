
global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies

global.requestAnimationFrame = callback => setTimeout(callback, 0);

const Enzyme = require('enzyme'); // eslint-disable-line import/no-extraneous-dependencies
const Adapter = require('enzyme-adapter-react-16'); // eslint-disable-line import/no-extraneous-dependencies

Enzyme.configure({ adapter: new Adapter() });
