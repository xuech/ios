'use strict';

module.exports = angular.module('suppliers', [])

  // Resources
  .factory('SuppliersTransformer', require('./transformer.suppliers'))
  .factory('SuppliersResources',   require('./resources.suppliers'))

  // Services
  .provider('SuppliersService', require('./service.suppliers'))
