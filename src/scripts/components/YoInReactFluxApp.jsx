/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/reset.css');
require('../../styles/main.css');

var IndexRoute = require('../../scripts/components/IndexRoute.jsx');
var DemoAuthenticatedRoute = require('../../scripts/components/DemoAuthenticatedRoute.jsx');

var YoInReactFluxApp = React.createClass({
  render: function() {
    return (
      <IndexRoute />
    );
  }
});

React.renderComponent(<YoInReactFluxApp />, document.getElementById('content')); // jshint ignore:line

module.exports = YoInReactFluxApp;
