'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _apolloLink = require('apollo-link');

var _printer = require('graphql/language/printer');

var _extractFiles = require('extract-files');

var _extractFiles2 = _interopRequireDefault(_extractFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A modified version of apollo-upload-link by jaydenseric.
 * https://github.com/jaydenseric/apollo-upload-client
 *
 * This link does not use jaydenseric's request form spec. It instead sends
 * requests in the standard format as Django/Graphene-Python expects.
 */
var createUploadLink = function createUploadLink() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      includeExtensions = _ref.includeExtensions,
      _ref$uri = _ref.uri,
      linkUri = _ref$uri === undefined ? '/graphql' : _ref$uri,
      linkCredentials = _ref.credentials,
      linkHeaders = _ref.headers,
      _ref$fetchOptions = _ref.fetchOptions,
      linkFetchOptions = _ref$fetchOptions === undefined ? {} : _ref$fetchOptions,
      _ref$fetch = _ref.fetch,
      linkFetch = _ref$fetch === undefined ? fetch : _ref$fetch;

  return new _apolloLink.ApolloLink(function (_ref2) {
    var operationName = _ref2.operationName,
        variables = _ref2.variables,
        query = _ref2.query,
        extensions = _ref2.extensions,
        getContext = _ref2.getContext,
        setContext = _ref2.setContext;
    return new _apolloLink.Observable(function (observer) {
      // Construct the headers and other options...

      var _getContext = getContext(),
          _getContext$uri = _getContext.uri,
          uri = _getContext$uri === undefined ? linkUri : _getContext$uri,
          _getContext$credentia = _getContext.credentials,
          credentials = _getContext$credentia === undefined ? linkCredentials : _getContext$credentia,
          contextHeaders = _getContext.headers,
          _getContext$fetchOpti = _getContext.fetchOptions,
          contextFetchOptions = _getContext$fetchOpti === undefined ? {} : _getContext$fetchOpti;

      var fetchOptions = _extends({}, linkFetchOptions, contextFetchOptions, {
        headers: _extends({}, linkFetchOptions.headers, contextFetchOptions.headers, linkHeaders, contextHeaders),
        method: 'POST'
      });

      if (credentials) {
        fetchOptions.credentials = credentials;
      }

      // Construct the request operation...

      var requestOperation = { query: (0, _printer.print)(query) };

      if (operationName) {
        requestOperation.operationName = operationName;
      }
      if (Object.keys(variables).length) {
        requestOperation.variables = variables;
      }
      if (extensions && includeExtensions) {
        requestOperation.extensions = extensions;
      }

      var files = (0, _extractFiles2.default)(requestOperation);

      // Build either the JSON or Form Data Request...

      if (files.length) {
        fetchOptions.body = new FormData();

        // Stringify variables.
        if (requestOperation.variables) {
          requestOperation.variables = JSON.stringify(variables);
        }

        Object.keys(requestOperation).forEach(function (key) {
          fetchOptions.body.append(key, requestOperation[key]);
        });
        files.forEach(function (_ref3, index) {
          var file = _ref3.file;

          fetchOptions.body.append(index, file, file.name);
        });
      } else {
        fetchOptions.headers['content-type'] = 'application/json';
        fetchOptions.body = JSON.stringify(requestOperation);
      }

      // Perform fetch...

      linkFetch(uri, fetchOptions).then(function (response) {
        setContext({ response: response });
        if (response.status >= 300 || !response.ok) {
          var error = new Error('' + response.statusText);
          error.response = response;
          error.statusCode = response.status;
          throw error;
        }
        return response.json();
      }).then(function (result) {
        observer.next(result);
        observer.complete();
      }).catch(function (error) {
        return observer.error(error);
      });
    });
  });
};

exports.default = createUploadLink;