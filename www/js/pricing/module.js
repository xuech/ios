'use strict';

module.exports = angular.module('pricing', [])

  // Resources
  .factory('PricingTransformer', require('./transformer.pricing'))
  .factory('PricingResources',   require('./resources.pricing'))

  // Services
  .provider('PricingService', require('./service.pricing'))