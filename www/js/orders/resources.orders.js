'use strict';

function OrdersResources($resource, apiUrl, OrdersTransformer) {

  return $resource('', {}, {

    orders: {
      method: 'GET',
      url: `${apiUrl}/resources/orders`,
      isArray: false,
      interceptor: OrdersTransformer.orders
    },

    order: {
      method: 'GET',
      url: `${apiUrl}/resources/orders/:orderId`,
      isArray: false,
      interceptor: OrdersTransformer.order
    },

    unitCosts: {
      method: 'GET',
      url: `${apiUrl}/resources/orders/unitCosts/:orderId`,
      isArray: true
    }

  });

}

module.exports = ['$resource', 'apiUrl', 'OrdersTransformer', OrdersResources];
