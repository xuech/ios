'use strict';

module.exports = angular.module('companies', [])
  .factory('CompaniesTransformer', require('./transformer.companies'))
  .factory('CompaniesResources',   require('./resources.companies'))

  .provider('CompaniesService', require('./service.companies'));
