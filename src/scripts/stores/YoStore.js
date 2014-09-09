/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * YoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var YoConstants = require('../constants/YoConstants');
var merge = require('react/lib/merge');

var Firebase = require('firebase/lib/firebase-web');

var CHANGE_EVENT = 'change';

var baseUrl = 'https://yo-in-react.firebaseio.com';


var sendYo = function(personToYo) {
  var $this = this;
  var yoRecipient = new Firebase(baseUrl + '/users/' + personToYo);

  yoRecipient.once('value', function(data) {
    if (!data.val()) {
      return;
    }

    yoRecipient.child('yoCount').set((data.val().yoCount + 1) || 1);
    yoRecipient.child('notifications').push({
      from : $this.props.name,
      timestamp : new Date().getTime()
    });
  });
};

var yoList = [];
var notifications = [];


var firebaseRef = new Firebase(baseUrl + '/users/special-user-for-demo');

firebaseRef.child('notifications').on('child_added', function(dataSnapshot) {
  notifications.push(dataSnapshot.val());
  YoStore.emitChange();
});

firebaseRef.child('yoList').on('child_added', function(dataSnapshot) {
  yoList.push(dataSnapshot.val());
  YoStore.emitChange();
});


var YoStore = merge(EventEmitter.prototype, {

  getName: function() {

  },

  getYoCount: function() {
    return notifications.length;
  },

  getPeopleToYo: function() {
    return yoList;
  },

  getYoNotifications: function() {
    return notifications;
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

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case YoConstants.YO_SEND_YO:
      sendYo(action.person);
      break;

    case YoConstants.YO_USER_AUTHENTICATED:
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = YoStore;