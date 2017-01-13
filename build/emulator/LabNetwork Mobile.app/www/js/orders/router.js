'use strict';

module.exports = ['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('app.orders', {
      abstract: true,
      url: '/orders',
      views: {
        content: {
          templateUrl: 'orders/template.html',
          controller : 'OrdersController'
        }
      }
    })

    .state('app.orders.index', {
      url: '',
      cache: false,
      views: {
        index: {
          templateUrl: 'orders/index/template.html',
          controller : 'OrdersIndexController'
        }
      }
    })

    .state('app.orders.details', {
      url: '/details/:id',
      views: {
        index: {
          templateUrl: 'orders/details/template.html',
          controller : 'OrdersDetailsController'
        }
      },
      resolve: {
        orderId: ['$stateParams', ($stateParams) => {
          return $stateParams.id;
        }]
      }
    })

}];
