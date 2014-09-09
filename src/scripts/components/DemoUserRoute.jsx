/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/IndexRoute.css');
var Firebase = require('firebase/lib/firebase-web');
var ReactFireMixin = require('reactfire/dist/reactfire');

var UserDisplay = require('../../scripts/components/UserDisplay.jsx');
var PeopleToYo = require('../../scripts/components/PeopleToYo.jsx');
var YoDisplay = require('../../scripts/components/YoDisplay.jsx');
var AddPerson = require('../../scripts/components/AddPerson.jsx');

var IndexRoute = React.createClass({
  mixins : [ReactFireMixin],
  componentWillMount : function() {
    var baseUrl = 'https://yo-in-react.firebaseio.com';
    var newRef = new Firebase(baseUrl + '/users/special-user-for-demo');
    this.bindAsObject(newRef, 'user');
  },
  getInitialState : function() {
    return {
      name : 'special-user-for-demo',
      user : {}
    };
  },
  render : function() {

    return (
      <div>
        <h3>My Web Version of Yo using React and Firebase</h3>
        <div className="margin-bottom">This is a demo page signed in with the username "special-user-for-demo"<br/>You can actually sign in via Twitter <a href="authenticated.html">here</a>.</div>
        <UserDisplay user={this.state.user} />
        <PeopleToYo name={this.state.name} />
        <AddPerson />
        <YoDisplay user={this.state.user} name={this.state.name} />
        <h5>Made by <a href="https://twitter.com/davidchizzle">@davidchizzle</a> from <a href="http://davidandsuzi.com">davidandsuzi.com</a></h5>
      </div>
    );
  }
});

module.exports = IndexRoute;
