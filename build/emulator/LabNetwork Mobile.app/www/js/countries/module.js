'use strict';

module.exports = angular.module('countries', [])

  // Directives
  .directive( 'selectedCountry', require('./directives/selected-country/directive') )
  .directive( 'countrySelector', require('./directives/country-selector/directive') )

  // Controllers
  .controller('SelectedCountryController', require('./directives/selected-country/controller'))
  .controller('CountrySelectorController', require('./directives/country-selector/controller'))

  // Services
  .factory('CountryService', require('./service.country'))

  // Resources
  .factory('CountryResources', require('./resources.country'));
