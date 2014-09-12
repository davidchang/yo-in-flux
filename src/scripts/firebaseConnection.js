var Firebase = require('firebase/lib/firebase-web');

var baseUrl = 'https://yo-in-flux.firebaseio.com';

var firebaseConnection = new Firebase(baseUrl);

module.exports = firebaseConnection;