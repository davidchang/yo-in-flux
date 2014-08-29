/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/UserDisplay.css');

var UserDisplay = React.createClass({
  render : function() {
    return (
      <section>
        <div className="panel panel-default">
          <div className="panel-heading">Username</div>
          <div className="panel-body">
            <strong>{this.props.user.name}</strong>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = UserDisplay;
