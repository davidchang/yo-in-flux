/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var YoActions = require('../actions/YoActions');

var MainInterface = require('../../scripts/components/MainInterface.jsx');

var firebaseConnection = require('../firebaseConnection');

var AuthRequiredRoute = React.createClass({
  componentWillMount : function() {
    var $this = this;

    this.authRef = new FirebaseSimpleLogin(firebaseConnection, function(error, user) {
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
          <MainInterface />
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
        <MainInterface unauthenticated="true" />
      </div>
    );
  }
});

module.exports = AuthRequiredRoute;
