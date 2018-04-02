import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  static defaultState = {
    uncaughtError: null,
  };

  constructor() {
    super();
    this.state = { ...this.defaultState };
  }

  componentDidCatch(error, info) {
    this.setState({ uncaughtError: { error, info } });
  }

  render = () => {
    const { uncaughtError } = this.state;
    if (uncaughtError) {
      return (
        <div className="container" style={{ marginTop: '20px' }}>
          <Panel bsStyle="danger">
            <Panel.Heading>An uncaught rendering error has occurred!</Panel.Heading>
            <Panel.Body>
              <p>This failure is unrecoverable. Please contact the system administrator.</p>
              <p>Logging in and out will not solve this issue.</p>
            </Panel.Body>
            <Panel.Footer className="text-right">
              <i>{'All that\'s left to us is honor.'}</i>
            </Panel.Footer>
          </Panel>
        </div>
      );
    }

    return this.props.children;
  };
}

export default ErrorBoundary;
