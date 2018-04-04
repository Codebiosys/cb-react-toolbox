import { mapDispatchToProps } from './IdleTimer';

import { logout } from './actions';

const dispatch = jest.fn();

describe('The IdleTimer notifier', () => {
  it('has a logout dispatch', () => {
    expect(mapDispatchToProps(dispatch)).toHaveProperty('logout');
  });

  it('dispatches a logout action when called', () => {
    const dispatcher = mapDispatchToProps(dispatch);
    dispatcher.logout();
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
