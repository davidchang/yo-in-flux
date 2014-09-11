/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/DemoAuthenticatedRoute.css');
var Firebase = require('firebase/lib/firebase-web');

var YoActions = require('../actions/YoActions');

var UserDisplay = require('../../scripts/components/UserDisplay.jsx');
var PeopleToYo = require('../../scripts/components/PeopleToYo.jsx');
var YoDisplay = require('../../scripts/components/YoDisplay.jsx');
var AddPerson = require('../../scripts/components/AddPerson.jsx');

var AuthRequiredRoute = React.createClass({
  componentWillMount : function() {
    var baseUrl = 'https://yo-in-react.firebaseio.com';

    var $this = this;

    this.authRef = new FirebaseSimpleLogin(new Firebase(baseUrl), function(error, user) {
      $this.setState({
        errorMsg : ''
      });

      if (error) {
        // an error occurred while attempting login
        $this.setState({
          errorMsg : error.message,
          authenticated : false
        });

        YoActions.userUnauthenticated();
      } else if (user) {
        // user authenticated with Firebase
        $this.setState({
          authenticated : true
        });

        YoActions.userAuthenticated(user.username);
      } else {
        // user is logged out
        $this.setState({
          authenticated : false
        });

        YoActions.userUnauthenticated();
      }
    });
  },
  getInitialState : function() {
    return {
      errorMsg : '',
      authenticated : false
    };
  },
  _logout : function() {
    this.authRef.logout();
  },
  _login : function() {
    this.authRef.login('twitter', {
      rememberMe: true
    });
  },
  render : function() {

    if (this.state.authenticated) {
      return (
        <div>
          <a className="margin-bottom btn btn-default btn-large" href="#" onClick={this._logout}>Logout</a>
          <UserDisplay />
          <PeopleToYo />
          <AddPerson />
          <YoDisplay />
          <h5>Made by <a href="https://twitter.com/davidchizzle">@davidchizzle</a> from <a href="http://davidandsuzi.com">davidandsuzi.com</a></h5>
        </div>
      );
    }

    var errorMsg = '';
    if (this.state.errorMsg) {
      errorMsg = <div className="alert alert-danger" role="alert">Error : {this.state.errorMsg}</div>
    }

    return (
      <div>
        <h3>My Web Version of Yo using React and Firebase</h3>
        <div className="margin-bottom">If you do not want to log in, you can still view the experience at <a href="/index.html">here</a>.</div>
        {errorMsg}
        <a className="margin-bottom btn btn-primary" href="#" onClick={this._login}>Login</a>
        <h5>Made by <a href="https://twitter.com/davidchizzle">@davidchizzle</a> from <a href="http://davidandsuzi.com">davidandsuzi.com</a></h5>
      </div>
    );
  }
});

module.exports = AuthRequiredRoute;
