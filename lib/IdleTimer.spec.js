'use strict';

var _IdleTimer = require('./IdleTimer');

var _actions = require('./redux/actions');

var dispatch = jest.fn();

describe('The IdleTimer notifier', function () {
  it('has a logout dispatch', function () {
    expect((0, _IdleTimer.mapDispatchToProps)(dispatch)).toHaveProperty('logout');
  });

  it('dispatches a logout action when called', function () {
    var dispatcher = (0, _IdleTimer.mapDispatchToProps)(dispatch);
    dispatcher.logout();
    expect(dispatch).toHaveBeenCalledWith((0, _actions.logout)());
  });
});