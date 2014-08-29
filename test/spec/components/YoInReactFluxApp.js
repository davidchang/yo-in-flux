'use strict';

describe('Main', function () {
  var YoInReactFluxApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    YoInReactFluxApp = require('../../../src/scripts/components/YoInReactFluxApp.jsx');
    component = YoInReactFluxApp();
  });

  it('should create a new instance of YoInReactFluxApp', function () {
    expect(component).toBeDefined();
  });
});
