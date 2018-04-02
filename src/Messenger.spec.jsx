import React from 'react';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import PropTypes from 'prop-types';

import Notifications from 'react-notification-system-redux';

import Messenger from './Messenger';

describe('The Messenger notifier', () => {
  let wrapper;
  let mounted;
  const defaultStore = { notifications: [{ title: 'A Message' }] };
  let store;
  beforeEach(() => {
    store = createMockStore(defaultStore);
    mounted = shallow(
      <Messenger />,
      { context: { store },
        childContextTypes: { store: PropTypes.object },
      },
    );
    wrapper = mounted.find(Notifications);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('has current state notifications', () => {
    expect(wrapper.props()).toHaveProperty('notifications');
    expect(wrapper.props().notifications).toEqual(defaultStore.notifications);
  });
});
