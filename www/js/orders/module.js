'use strict';

module.exports = angular.module('orders', [])

  // Models
  .provider('OrdersModel', require('./index/model.orders'))
  .provider('OrderModel',  require('./details/model.order'))

  // Controllers
  .controller('OrdersController',        require('./controller'))
  .controller('OrdersIndexController',   require('./index/controller'))
  .controller('OrdersDetailsController', require('./details/controller'))

  // Directives
  .directive('orderAddresses', require('./directives/order-addresses/directive'))
  .directive('orderCard',      require('./directives/order-card/directive'))
  .directive('orderCosts',     require('./directives/order-costs/directive'))
  .directive('orderProducts',  require('./directives/order-products/directive'))

  // Resources
  .factory('OrdersTransformer', require('./transformer.orders'))
  .factory('OrdersResources',   require('./resources.orders'))

  // Transformers
  .service('OrdersTransformerOrders',  require('./index/transformer.orders'))
  .service('OrdersTransformerOrder',   require('./details/transformer.orders'))
  .service('ProductsTransformerOrder', require('./details/transformer.products'))

  // Services
  .provider('OrdersService', require('./service.orders'))

  .config(require('./router'));
