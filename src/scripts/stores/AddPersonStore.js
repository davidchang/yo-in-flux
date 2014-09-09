/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AddPersonStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var YoConstants = require('../constants/YoConstants');
var merge = require('react/lib/merge');

var Firebase = require('firebase/lib/firebase-web');

var CHANGE_EVENT = 'change';

var baseUrl = 'https://yo-in-react.firebaseio.com';

var showError = false,
  newPersonsName = '';


var AddPersonStore = merge(EventEmitter.prototype, {

  getNewPersonName: function() {
    return newPersonsName;
  },

  getShowError: function() {
    return showError;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

var addPerson = function(personToAdd) {
  var $this = this;
  var newPersonRef = new Firebase(baseUrl + '/users/' + personToAdd);
  newPersonRef.once('value', function(data) {
    if (!data.val()) {
      showError = true;
      AddPersonStore.emitChange();
      return;
    }

    $this.firebaseRefs['yoList'].push({
      name: $this.state.newPerson.trim()
    });

    showError = false;
    newPersonsName = '';
    AddPersonStore.emitChange();
  });
};

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case YoConstants.ADD_PERSON:
      addPerson(action.person);
      break;

    case YoConstants.ADD_PERSON_CHANGE_NAME:
      newPersonsName = action.name;
      showError = false;
      AddPersonStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = AddPersonStore;