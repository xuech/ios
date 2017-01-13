'use strict';

module.exports = angular.module('checkout', [])
  // Models
  .provider('CheckoutAddressModel', require('./model.address'))

  // Controllers
  .controller('CheckoutController',                 require('./controller'))
  .controller('CheckoutAddressController',          require('./address/controller'))
  .controller('CheckoutAddressSelectionController', require('./address-select/controller'))

  // Transformers
  .service('CheckoutAddressesTransformerCompanies', require('./address-select/transformer.companies'))

  .config(require('./router'));
