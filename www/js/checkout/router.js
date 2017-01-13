'use strict';

module.exports = ['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('app.checkout', {
      url: '/checkout',
      abstract: true,
      cache: false,
      views: {
        content: {
          templateUrl: 'checkout/template.html',
          controller : 'CheckoutController'
        }
      }
    })

    .state('app.checkout.address', {
      url: '',
      views: {
        index: {
          templateUrl: 'checkout/address/template.html',
          controller : 'CheckoutAddressController'
        }
      }
    })

    .state('app.checkout.address-add', {
      url: '/address/add',
      views: {
        index: {
          templateUrl: 'checkout/address-add/template.html',
        }
      }
    })

    .state('app.checkout.address-select', {
      url: '/address/select/:selectionId',
      views: {
        index: {
          templateUrl: 'checkout/address-select/template.html',
          controller : 'CheckoutAddressSelectionController'
        }
      }
    })

}];
