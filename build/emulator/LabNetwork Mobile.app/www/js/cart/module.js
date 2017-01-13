'use strict';

module.exports = angular.module('cart', [])
  // Models
  .provider('CartModel',     require('./model.cart'))
  .provider('CartItemModel', require('./model.item'))

  // Cart
  .controller('CartController', require('./controller'))

  // Items
  .service('CartItemsTransformerCart',  require('./items/transformer.items'))
  .controller('CartItemsController',    require('./items/controller'))

  // Saved
  .service('CartSavedItemsTransformerCart', require('./saved/transformer.items'))
  .controller('CartSavedController',        require('./saved/controller'))

  // Directives
  .directive('cartItem',                 require('./directives/cart-item/directive'))
  .controller('CartItemController',      require('./directives/cart-item/controller'))
  .service('CartItemTransformerPricing', require('./directives/cart-item/transformer.pricing'))

  .directive('cartDetails',            require('./directives/cart-details/directive'))
  .controller('CartDetailsController', require('./directives/cart-details/controller'))

  .directive('cartSavedDetails', require('./directives/cart-saved-details/directive'))

  .directive('cartBadge',            require('./directives/cart-badge/directive'))
  .controller('CartBadgeController', require('./directives/cart-badge/controller'))

  // Resources
  .factory('CartTransformer', require('./transformer.cart'))
  .factory('CartResources',   require('./resources.cart'))
  .provider('CartService',    require('./service.cart'))

  .config(require('./router'));
