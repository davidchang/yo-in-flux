/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/YoDisplay.css');
var YoStore = require('../stores/YoStore');

var getState = function() {
  return {
    notifications: YoStore.getNotifications()
  };
};

var YoDisplay = React.createClass({
  componentDidMount: function() {
    YoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    YoStore.removeChangeListener(this._onChange);
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
            {this.state.notifications.length || 0}
          </div>
        </div>

        {notifications}
      </section>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = YoDisplay;
