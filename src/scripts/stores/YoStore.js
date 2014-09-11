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

var _ = require('lodash/lodash');

var Firebase = require('firebase/lib/firebase-web');

var CHANGE_EVENT = 'change';

var baseUrl = 'https://yo-in-flux.firebaseio.com';


var sendYo = function(personToYo) {
  var $this = this;
  var yoRecipient = new Firebase(baseUrl + '/users/' + personToYo);

  yoRecipient.once('value', function(data) {
    if (!data.val()) {
      return;
    }

    // not actually using this in the app, but might as well keep it updated
    yoRecipient.child('yoCount').set((data.val().yoCount + 1) || 1);
    yoRecipient.child('notifications').push({
      from : personToYo,
      timestamp : new Date().getTime()
    });
  });
};

var authenticatedUser = '';
var yoList = [];
var notifications = [];


var YoStore = merge(EventEmitter.prototype, {

  getName: function() {
    return authenticatedUser;
  },

  getPeopleToYo: function() {
    return yoList;
  },

  getNotifications: function() {
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

var emit = _.debounce(YoStore.emitChange.bind(YoStore), 300, {
  leading : true,
  trailing : true
});


var authenticatedUserRef;

var initializeUser = function(person) {
  authenticatedUser = person;
  notifications = [];
  yoList = [];

  authenticatedUserRef = new Firebase(baseUrl + '/users/' + authenticatedUser);

  // not actually using this in the app, but might as well keep it updated
  authenticatedUserRef.child('name').set(authenticatedUser);

  // only listening on child_added is actually totally sufficient because these entities are only ever added
  authenticatedUserRef.child('notifications').on('child_added', function(dataSnapshot) {
    notifications.push(dataSnapshot.val());
    emit();
  });

  authenticatedUserRef.child('yoList').on('child_added', function(dataSnapshot) {
    yoList.push(dataSnapshot.val());
    emit();
  });

  // on the case that no notifications, and no yoList..
  emit();
};


// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case YoConstants.YO_SEND_YO:
      sendYo(action.person);
      break;

    case YoConstants.YO_USER_AUTHENTICATED:
      initializeUser(action.person);
      break;

    case YoConstants.YO_USER_UNAUTHENTICATED:
      authenticatedUser = '';
      authenticatedUserRef = '';
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = YoStore;