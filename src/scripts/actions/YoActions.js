/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * YoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var YoConstants = require('../constants/YoConstants');

var YoActions = {

  addPerson: function(person) {
    AppDispatcher.handleViewAction({
      actionType: YoConstants.ADD_PERSON,
      person: person
    });
  },

  addPersonChangeName: function(name) {
    AppDispatcher.handleViewAction({
      actionType: YoConstants.ADD_PERSON_CHANGE_NAME,
      name: name
    });
  },

  sendYo: function(person) {
    AppDispatcher.handleViewAction({
      actionType: YoConstants.YO_SEND_YO,
      person: person
    });
  },

  userAuthenticated: function(person) {
    AppDispatcher.handleViewAction({
      actionType: YoConstants.YO_USER_AUTHENTICATED,
      person: person
    });
  }

};

module.exports = YoActions;