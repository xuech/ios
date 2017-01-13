'use strict';

module.exports = angular.module('auth', [])

  // Transformer
  .factory('AuthTransformer', require('./transformer.auth'))

  // Resources
  .factory('AuthResources', require('./resources.auth'))

  // Services
  .factory('AuthService', require('./service.auth'));
