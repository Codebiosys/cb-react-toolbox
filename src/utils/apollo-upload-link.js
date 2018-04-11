import { ApolloLink, Observable } from 'apollo-link';
import { print } from 'graphql/language/printer';
import extractFiles from 'extract-files';
import fetch from 'unfetch';
/**
 * A modified version of apollo-upload-link by jaydenseric.
 * https://github.com/jaydenseric/apollo-upload-client
 *
 * This link does not use jaydenseric's request form spec. It instead sends
 * requests in the standard format as Django/Graphene-Python expects.
 */
const createUploadLink = ({
  includeExtensions,
  uri: linkUri = '/graphql',
  credentials: linkCredentials,
  headers: linkHeaders,
  fetchOptions: linkFetchOptions = {},
  fetch: linkFetch = fetch,
} = {}) => new ApolloLink(
  ({ operationName, variables, query, extensions, getContext, setContext }) =>
    new Observable((observer) => {
      // Construct the headers and other options...

      const {
        uri = linkUri,
        credentials = linkCredentials,
        headers: contextHeaders,
        fetchOptions: contextFetchOptions = {},
      } = getContext();

      const fetchOptions = {
        ...linkFetchOptions,
        ...contextFetchOptions,
        headers: {
          ...linkFetchOptions.headers,
          ...contextFetchOptions.headers,
          ...linkHeaders,
          ...contextHeaders,
        },
        method: 'POST',
      };

      if (credentials) {
        fetchOptions.credentials = credentials;
      }

      // Construct the request operation...

      const requestOperation = { query: print(query) };

      if (operationName) {
        requestOperation.operationName = operationName;
      }
      if (Object.keys(variables).length) {
        requestOperation.variables = variables;
      }
      if (extensions && includeExtensions) {
        requestOperation.extensions = extensions;
      }

      const files = extractFiles(requestOperation);

      // Build either the JSON or Form Data Request...

      if (files.length) {
        fetchOptions.body = new FormData(); // eslint-disable-line

        // Stringify variables.
        if (requestOperation.variables) {
          requestOperation.variables = JSON.stringify(variables);
        }

        Object.keys(requestOperation).forEach((key) => {
          fetchOptions.body.append(key, requestOperation[key]);
        });
        files.forEach(({ file }, index) => {
          fetchOptions.body.append(index, file, file.name);
        },
        );
      } else {
        fetchOptions.headers['content-type'] = 'application/json';
        fetchOptions.body = JSON.stringify(requestOperation);
      }

      // Perform fetch...

      linkFetch(uri, fetchOptions)
        .then((response) => {
          setContext({ response });
          if (response.status >= 300 || !response.ok) {
            const error = new Error(`${response.statusText}`);
            error.response = response;
            error.statusCode = response.status;
            throw error;
          }
          return response.json();
        })
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch(error => observer.error(error));
    },
    ),
);

export default createUploadLink;
