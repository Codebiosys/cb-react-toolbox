import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import { Icon } from 'react-fa';

export default class LoadSensor extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    loadMoreEntries: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: false,
    hasNextPage: null,
  }
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  componentDidMount = () => {
    this.setState({ active: true });
  }

  loadMore = (isVisible) => {
    const { loading, hasNextPage, loadMoreEntries } = this.props;
    if (isVisible && !loading && hasNextPage) {
      this.setState({ active: false });
      loadMoreEntries().then(() => {
        this.setState({ active: true });
      }).catch((e) => {
        console.log(e); // eslint-disable-line
      });
    }
  }

  render = () => {
    const { loading, hasNextPage } = this.props;
    if (loading) {
      return (
        <center><Icon spin name="refresh" size="2x" /></center>
      );
    } else if (hasNextPage === true) {
      return (
        <VisibilitySensor
          active={this.state.active}
          onChange={this.loadMore}
          delayedCall
        />
      );
    }
    return (<center width="100%">All content loaded</center>);
  }
}
