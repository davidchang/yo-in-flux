/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/PeopleToYo.css');

var YoActions = require('../actions/YoActions');
var YoStore = require('../stores/YoStore');

var getState = function() {
  return {
    yoList: YoStore.getPeopleToYo()
  };
};

var PeopleToYo = React.createClass({
  componentDidMount: function() {
    YoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    YoStore.removeChangeListener(this._onChange);
  },
  getInitialState : function() {
    return {
      yoList : []
    };
  },
  _sendYo : function(personToYo) {
    YoActions.sendYo(personToYo);
  },
  render : function() {
    if (!this.state.yoList.length) {
      return <section></section>;
    }

    var usersToYoHtml = (
      <div className="panel panel-default">
        <div className="panel-heading">Users To Yo</div>
        <div className="panel-body">
          <ul className="list-unstyled">{this.state.yoList.map(function(person) {
            return <li>{person.name} <button className="btn btn-primary" onClick={this._sendYo.bind(this, person.name)}>Yo</button></li>;
          }, this)}</ul>
        </div>
      </div>
    );

    return <section>{usersToYoHtml}</section>;
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = PeopleToYo;
