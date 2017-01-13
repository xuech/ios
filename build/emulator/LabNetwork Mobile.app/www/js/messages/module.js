'use strict';

module.exports = angular.module('messages', [])
  // messages.generated is auto-generated from gulp task `build-messages`
  .constant('MessagesService', require('./messages.generated')['messages']);