'use strict';

describe('UserDisplay', function () {
  var UserDisplay, component;

  beforeEach(function () {
    UserDisplay = require('../../../src/scripts/components/UserDisplay.jsx');
    component = UserDisplay();
  });

  it('should create a new instance of UserDisplay', function () {
    expect(component).toBeDefined();
  });
});
