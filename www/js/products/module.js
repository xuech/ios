'use strict';

module.exports = angular.module('products', [])
  // Resources
  .factory('ProductsTransformer', require('./transformer.products'))
  .factory('ProductsResources',   require('./resources.products'))

  // Services
  .provider('ProductsService', require('./service.products'));