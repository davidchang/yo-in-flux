/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/PeopleToYo.css');

var YoActions = require('../actions/YoActions');
var AddPersonStore = require('../stores/AddPersonStore');

var baseUrl = 'https://yo-in-react.firebaseio.com';

var getState = function() {
  return {
    showError: AddPersonStore.getShowError(),
    newPerson: AddPersonStore.getNewPersonName()
  };
};

var AddPerson = React.createClass({
  componentDidMount: function() {
    AddPersonStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AddPersonStore.removeChangeListener(this._onChange);
  },
  getInitialState : function() {
    return {
      newPerson : '',
      showError : false
    };
  },
  _handleChange : function(event) {
    YoActions.addPersonChangeName(event.target.value);
  },
  _addPerson : function(e) {
    e.preventDefault();
    if (!this.state.newPerson.trim()) {
      return;
    }

    YoActions.addPerson(this.state.newPerson.trim());
  },
  render : function() {
    var errorHtml = '';
    if (this.state.showError) {
      errorHtml = <div className="alert alert-danger" role="alert">That person does not exist!</div>;
    }

    return (
      <section>
        <div className="panel panel-default">
          <div className="panel-heading">Add New User</div>
          <div className="panel-body">
            <form role="form">
              {errorHtml}
              <div className="form-group">
                <input type="text" className="form-control text-center" placeholder="Twitter Handle" value={this.state.newPerson} onChange={this._handleChange} />
              </div>

              <button type="submit" onClick={this._addPerson} className="btn btn-default">Add to Yo List</button>
            </form>
          </div>
        </div>

      </section>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = AddPerson;
