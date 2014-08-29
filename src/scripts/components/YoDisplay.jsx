/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/YoDisplay.css');
var Firebase = require('firebase/lib/firebase-web');
var ReactFireMixin = require('reactfire/dist/reactfire');

var baseUrl = 'https://yo-in-react.firebaseio.com';

var YoDisplay = React.createClass({
  mixins : [ReactFireMixin],
  componentWillMount : function() {
    this.bindAsArray(new Firebase(baseUrl + '/users/' + this.props.name + '/notifications'), 'notifications');
  },
  getInitialState : function() {
    return {
      notifications : []
    };
  },
  render : function() {
    var notifications = '';
    if (this.state.notifications.length) {
      notifications = (
        <div className="panel panel-default">
          <div className="panel-heading">Yos</div>
          <div className="panel-body">
            <ul className="list-unstyled">{this.state.notifications.slice().reverse().map(function(notification) {
              var timestamp = new Date(notification.timestamp).toString();
              return <li>{notification.from} on {timestamp}</li>;
            })}</ul>
          </div>
        </div>
      );
    }
    return (
      <section>
        <div className="panel panel-default">
          <div className="panel-heading">Yo Count</div>
          <div className="panel-body">
            {this.props.user.yoCount || 0}
          </div>
        </div>

        {notifications}
      </section>
    );
  }
});

module.exports = YoDisplay;
