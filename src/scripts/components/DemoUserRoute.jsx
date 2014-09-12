/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var YoActions = require('../actions/YoActions');

var MainInterface = require('../../scripts/components/MainInterface.jsx');

var DemoUserRoute = React.createClass({
  componentWillMount : function() {
    YoActions.userAuthenticated('special-user-for-demo');
  },
  render : function() {

    return (
      <div>
        <h3>My Web Version of Yo using React and Firebase</h3>
        <div className="margin-bottom">
          This is a demo page signed in with the username "special-user-for-demo"
          <br/>
          You can actually sign in via Twitter <a href="/authRequired.html">here</a>.
        </div>
        <MainInterface />
      </div>
    );
  }
});

module.exports = DemoUserRoute;
