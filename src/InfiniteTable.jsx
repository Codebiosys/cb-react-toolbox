import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import {
  Table,
  Panel,
} from 'react-bootstrap';

import LoadSensor from './LoadSensor';

/**
 * A Generic React Component for displaying results from an Apollo Query.
 * This component supports query results that are pending, loading, errored,
 * and completed.
 *
 * To use this component, subclass it and override the 2 required methods:
 * - getTableRow: How should each row be rendered?
 * - getObjects: Which objects should the component use to map to the rows?
 */
class InfiniteTable extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    loadMoreEntries: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool,
    totalCount: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    error: null,
    hasNextPage: false,
    totalCount: undefined,
  };

  /* Table Methods */

  /**
   * Override this method to provide a custom Table Header for your table.
   * This method is optional, but by default, no table header will be shown.
   */
  getTableHeader = () => {};

  /**
   * Subclasses should override this method to return an element to display for
   * the given object. This element should begin and end with <tr>.
   */
  getTableRow = (object) => {
    /* eslint no-unused-vars: 0 */
    throw new Error('Improperly configured. You forgot to override {getTableRow}.');
  };

  /**
   * Subclasses should override this method to return the list of objects that
   * are used to create the rows for the table. This is also the results that
   * will be used in the total count calculations.
   */
  getObjects = () => {
    throw new Error('Improperly configured. You forgot to override {getObjects}.');
  };

  /**
   * Subclasses should override this method to provide custom render behavior
   * when no records are found to display in the table.
   */
  getNoRecordsElement = () => (
    <tr>
      <td colSpan="100%">
        <Panel bsStyle="info">
          <Panel.Heading>No Records</Panel.Heading>
          <Panel.Body>No records match your criteria</Panel.Body>
        </Panel>
      </td>
    </tr>
  );

  /**
   * Subclasses should override this method to provide custom render behavior
   * when an error was encountered while fetching the results for the table.
   */
  getErrorElement = error => (
    <tr>
      <td colSpan="100%">
        <Panel bsStyle="danger">
          <Panel.Heading>Error</Panel.Heading>
          <Panel.Body>{error.message}</Panel.Body>
        </Panel>
      </td>
    </tr>
  );

  /**
   * Subclasses should override this method to provide custom render behavior
   * when the table is loading new results, and no current results are available.
   */
  getLoadingElement = () => (
    <tr><td colSpan="100%" /></tr>
  );

  getTableBodyContents = (loading, error, objects) => {
    if (error) {
      // In the case of an error, display nothing but the error.
      return this.getErrorElement(error);
    } else if (objects.length) {
      // If we have results, then display them.
      return map(objects, object => (this.getTableRow(object)));
    } else if (loading) {
      // No results are present yet, but the query is loading.
      return this.getLoadingElement();
    }
    // No results are present, and the query has finished loading.
    return this.getNoRecordsElement();
  };

  /**
   * Override this value to determine whether or not to show the total count
   * information at the top of the table.
   */
  shouldShowCount = true;

  /* Lifecycle Methods */

  render = () => {
    const {
      children,
      loading,
      error,
      loadMoreEntries,
      hasNextPage,
      totalCount,
    } = this.props;

    return (
      <React.Fragment>
        {children}
        <Table striped bordered hover>
          {totalCount && this.shouldShowCount ?
            (<caption>Displaying {this.getObjects().length} of {totalCount} records</caption>) :
            null}
          <thead>
            {this.getTableHeader()}
          </thead>
          <tbody>
            {this.getTableBodyContents(loading, error, this.getObjects())}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="100%">
                <LoadSensor
                  loadMoreEntries={loadMoreEntries}
                  hasNextPage={hasNextPage}
                  loading={loading}
                />
              </td>
            </tr>
          </tfoot>
        </Table>
      </React.Fragment>
    );
  };
}

export default InfiniteTable;
