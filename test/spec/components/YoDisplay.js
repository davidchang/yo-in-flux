'use strict';

describe('YoDisplay', function () {
  var YoDisplay, component;

  beforeEach(function () {
    YoDisplay = require('../../../src/scripts/components/YoDisplay.jsx');
    component = YoDisplay();
  });

  it('should create a new instance of YoDisplay', function () {
    expect(component).toBeDefined();
  });
});
