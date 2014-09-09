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

var DemoUserRoute = require('../../scripts/components/DemoUserRoute.jsx');
var AuthRequiredRoute = require('../../scripts/components/AuthRequiredRoute.jsx');

var YoInReactFluxApp = React.createClass({
  render: function() {
    return (
      // <DemoUserRoute />
      <AuthRequiredRoute />
    );
  }
});

React.renderComponent(<YoInReactFluxApp />, document.getElementById('content')); // jshint ignore:line

module.exports = YoInReactFluxApp;
