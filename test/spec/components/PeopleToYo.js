'use strict';

describe('PeopleToYo', function () {
  var PeopleToYo, component;

  beforeEach(function () {
    PeopleToYo = require('../../../src/scripts/components/PeopleToYo.jsx');
    component = PeopleToYo();
  });

  it('should create a new instance of PeopleToYo', function () {
    expect(component).toBeDefined();
  });
});
