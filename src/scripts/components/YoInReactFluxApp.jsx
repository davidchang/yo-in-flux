/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/reset.css');
require('../../styles/bootstrap.css');
require('../../styles/main.css');

var DemoUserRoute = require('../../scripts/components/DemoUserRoute.jsx');
var AuthRequiredRoute = require('../../scripts/components/AuthRequiredRoute.jsx');

var YoInReactFluxApp = React.createClass({
  render: function() {
    return (
      <section>
        <Locations>
          <Location path="/index.html" handler={DemoUserRoute} />
          <Location path="/authRequired.html" handler={AuthRequiredRoute} />
          <NotFound handler={DemoUserRoute} />
        </Locations>
      </section>
    );
  }
});

React.renderComponent(<YoInReactFluxApp />, document.getElementById('content')); // jshint ignore:line

module.exports = YoInReactFluxApp;
