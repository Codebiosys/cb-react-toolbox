import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './FileUploadField.css';

const FAKE_PATH_PATTERN = /C:\\fakepath\\/i;

class FileUploadField extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }

  static defaultProps = {
    value: '',
    placeholder: '',
    onChange: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      filename: props.value.name || props.value,
    };
  }

  componentWillReceiveProps = ({ value }) => {
    // Reset the filename when props change.
    if (!value) {
      this.setState({
        ...this.state,
        filename: '',
      });
      this.formInput.value = '';
    }
  };

  handleBrowse = () => {
    this.formInput.click();
  };

  handleFileWasUpdated = () => {
    const filename = this.formInput.value.replace(FAKE_PATH_PATTERN, '');
    this.setState({ filename });

    // Alert parent components.
    this.props.onChange(this.formInput.files[0]);
  };

  render = () => {
    const { placeholder } = this.props;
    const { filename } = this.state;
    return (
      <div className="form-group">
        <input
          type="file"
          name="file"
          className="file"
          onChange={this.handleFileWasUpdated}
          ref={(e) => { this.formInput = e; }}
        />
        <div className="input-group col-xs-12">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-file" />
          </span>
          <span
            type="text"
            className="form-control text-center input-lg file-input-text-input"
            disabled
            readOnly
          >
            {filename || <span className="text-muted">{placeholder}</span>}
          </span>
          <span className="input-group-btn">
            <Button className="browse btn btn-default input-lg" onClick={this.handleBrowse}>
              <i className="glyphicon glyphicon-search" />&nbsp;
              Browse
            </Button>
          </span>
        </div>
      </div>
    );
  }
}

export default FileUploadField;
