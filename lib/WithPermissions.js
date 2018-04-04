'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = undefined;

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _WithPermissions = require('./components/WithPermissions');

var _WithPermissions2 = _interopRequireDefault(_WithPermissions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PERMISSIONS_PATH = 'auth.user.permissions';

var mapStateToProps = exports.mapStateToProps = function mapStateToProps(state) {
  // Get the permissions from the state and extract the codename. We don't need the rest.
  var userPermissions = (0, _lodash.get)(state, PERMISSIONS_PATH, []).map(function (_ref) {
    var codename = _ref.codename;
    return codename;
  });
  return { userPermissions: userPermissions };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_WithPermissions2.default);