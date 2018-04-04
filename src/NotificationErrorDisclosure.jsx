import React from 'react';
import {
  Button,
  Collapse,
} from 'react-bootstrap';
import PropTypes from 'prop-types';


class NotificationErrorDisclosure extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleCollapse = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };

  render = () => (
    <div className="text-right">
      <Button bsStyle="danger" bsSize="xsmall" onClick={this.toggleCollapse}>More Info</Button>
      <Collapse in={this.state.open}>
        <div className="text-left" style={{ marginTop: '10px' }}>
          {this.props.error.message}
        </div>
      </Collapse>
    </div>
  );
}

export default NotificationErrorDisclosure;
