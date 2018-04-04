import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import PropTypes from 'prop-types';

import ProtectedComponent from './ProtectedComponent';

const authenticate = jest.fn();
const children = (<div>children</div>);

describe('The Messenger notifier', () => {
  const defaultStore = {
    app: {
      auth: {
        authenticated: true,
      },
    },
  };
  const unAuthdefaultStore = {
    app: {
      auth: {
        authenticated: false,
      },
    },
  };
  let store;
  let wrapper;
  beforeEach(() => {
    store = createMockStore(defaultStore);
    wrapper = mount(
      <ProtectedComponent authenticate={authenticate}>{children}</ProtectedComponent>,
      { context: { store },
        childContextTypes: { store: PropTypes.object },
      },
    );
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders to null if not authenticated', () => {
    store = createMockStore(unAuthdefaultStore);
    wrapper = mount(
      <ProtectedComponent authenticate={authenticate}>{children}</ProtectedComponent>,
      { context: { store },
        childContextTypes: { store: PropTypes.object },
      },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
