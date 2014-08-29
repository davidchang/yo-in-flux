'use strict';

describe('IndexRoute', function () {
  var IndexRoute, component;

  beforeEach(function () {
    IndexRoute = require('../../../src/scripts/components/IndexRoute.jsx');
    component = IndexRoute();
  });

  it('should create a new instance of IndexRoute', function () {
    expect(component).toBeDefined();
  });
});
