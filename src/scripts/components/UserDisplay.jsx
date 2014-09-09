/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/UserDisplay.css');

var YoStore = require('../stores/YoStore');

var getState = function() {
  return {
    name: YoStore.getName()
  };
};

var UserDisplay = React.createClass({
  componentDidMount: function() {
    YoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    YoStore.removeChangeListener(this._onChange);
  },
  getInitialState : function() {
    return {
      name : ''
    };
  },
  render : function() {
    return (
      <section>
        <div className="panel panel-default">
          <div className="panel-heading">Username</div>
          <div className="panel-body">
            <strong>{this.state.name}</strong>
          </div>
        </div>
      </section>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = UserDisplay;
