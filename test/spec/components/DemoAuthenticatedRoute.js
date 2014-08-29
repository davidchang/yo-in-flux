'use strict';

describe('DemoAuthenticatedRoute', function () {
  var DemoAuthenticatedRoute, component;

  beforeEach(function () {
    DemoAuthenticatedRoute = require('../../../src/scripts/components/DemoAuthenticatedRoute.jsx');
    component = DemoAuthenticatedRoute();
  });

  it('should create a new instance of DemoAuthenticatedRoute', function () {
    expect(component).toBeDefined();
  });
});
