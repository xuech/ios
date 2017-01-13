'use strict';

module.exports = ['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('app.cart', {
      url: '/cart',
      abstract: true,
      views: {
        content: {
          templateUrl: 'cart/template.html',
          controller : 'CartController'
        }
      },
      resolve: ['CartService', (CartService) => {
        CartService.resetItems();
      }]
    })

    .state('app.cart.items', {
      url: '/items',
      views: {
        items: {
          templateUrl: 'cart/items/template.html',
          controller : 'CartItemsController'
        }
      }
    })

    .state('app.cart.saved', {
      url: '/saved',
      views: {
        saved: {
          templateUrl: 'cart/saved/template.html',
          controller : 'CartSavedController'
        }
      }
    })

    .state('app.cart.selections', {
      url: '/selections',
      views: {
        saved: {
          template: '<ion-view view-title="Selections"><ion-content>Selections Content...<h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1><h1>yo</h1></ion-content></ion-view>'
        }
      }
    })

}];
