/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var UserDisplay = require('../../scripts/components/UserDisplay.jsx');
var PeopleToYo = require('../../scripts/components/PeopleToYo.jsx');
var YoDisplay = require('../../scripts/components/YoDisplay.jsx');
var AddPerson = require('../../scripts/components/AddPerson.jsx');

// body and footer, not header
var MainInterface = React.createClass({
  render : function() {

    var actualAppComponents = '';
    if (!this.props.unauthenticated) {
      actualAppComponents = (
        <section>
          <UserDisplay />
          <PeopleToYo />
          <AddPerson />
          <YoDisplay />
        </section>
      );
    }

    return (
      <section>
        {actualAppComponents}
        <h5>Made by <a href="https://twitter.com/davidchizzle">@davidchizzle</a> from <a href="http://davidandsuzi.com">davidandsuzi.com</a></h5>
      </section>
    );
  }
});

module.exports = MainInterface;
