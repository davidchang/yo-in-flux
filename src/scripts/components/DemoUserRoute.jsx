/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/IndexRoute.css');

var YoActions = require('../actions/YoActions');

var UserDisplay = require('../../scripts/components/UserDisplay.jsx');
var PeopleToYo = require('../../scripts/components/PeopleToYo.jsx');
var YoDisplay = require('../../scripts/components/YoDisplay.jsx');
var AddPerson = require('../../scripts/components/AddPerson.jsx');

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
        <UserDisplay />
        <PeopleToYo />
        <AddPerson />
        <YoDisplay />
        <h5>Made by <a href="https://twitter.com/davidchizzle">@davidchizzle</a> from <a href="http://davidandsuzi.com">davidandsuzi.com</a></h5>
      </div>
    );
  }
});

module.exports = DemoUserRoute;
