import React from 'react';
import { shallow } from 'enzyme';

import LoadSensor from './LoadSensor';

const componentProps = {
  loading: false,
  hasNextPage: true,
  loadMoreEntries: jest.fn(() => Promise.resolve()),
};

describe('The Load Sensor', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <LoadSensor {...componentProps} />);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the spinner when loading', () => {
    const loadingProps = { ...componentProps, loading: true };
    wrapper = shallow(
      <LoadSensor {...loadingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders All Content Loaded when no more pages', () => {
    const allLoadedProps = { ...componentProps, hasNextPage: false };
    wrapper = shallow(
      <LoadSensor {...allLoadedProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls load more entries when visible', () => {
    wrapper.instance().loadMore(true);
    expect(componentProps.loadMoreEntries).toHaveBeenCalled();
  });

  it('does not call load more entries when not visible', () => {
    wrapper.instance().loadMore(false);
    expect(componentProps.loadMoreEntries).not.toHaveBeenCalled();
  });
});
