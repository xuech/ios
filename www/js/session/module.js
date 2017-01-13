'use strict';

module.exports = angular.module('session', [])

  // Transformers
  .service('AuthTransformerSession',  require('./transformer.auth'))

  // Services
  .factory('SessionService', require('./service.session'));
