'use strict';

import _ from 'lodash';

function OrdersTransformerOrder(MessagesService, ProductsService, OrdersTransformer) {

  return OrdersTransformer.order.transformResponse()
    .then((response) => {
      let order = response.data;
      const productsService = new ProductsService();
      const STATUSES   = MessagesService.orders.fulfillmentStatus;
      const CARD_TYPES = MessagesService.checkout.payment.card;

      // replace status code with proper status
      let statusCode = order.fulfillmentStatus;
      order.fulfillmentStatus = STATUSES[ statusCode ];

      // order or requisition
      order.isOrder       = order.orderType === 'ORDER';
      order.isRequisition = order.orderType === 'REQUISITION';

      // credit card payment formatting
      if ( order.creditCardPayment ) {
        let details  = order.paymentInfo;
        let cardType = CARD_TYPES[ details.cardType ];
        details.cardType = cardType;
      }

      _.each(order.orderItems, product => {
        // packaging size
        let packageSize = productsService.getProductPackageInfo( product );
        product.packageSizeDisplay = packageSize;

        // total price
        product.totalPrice = product.unitPrice;
        if ( !product.pricedFromTable ) {
          product.totalPrice *= product.quantity;
        }
      });

      // aggregate orderItems with their inventory
      let productIds = _.pluck( order.orderItems, 'productId' );
      productsService.getInventoryByProductIds( productIds ).then(inventories => {
        _.each(order.orderItems, product => {
          product.inventory = _.findWhere( inventories, { productId: product.productId } );
        });
      });

      // obo orders
      order.isOrderOBO = !!order.internalRepName;

      // aggregate cost summary
      order.costs = {
        totalItemCost: order.totalItemCost,
        shippingCost:  order.shippingCost,
        tax:           order.tax
      };

      return order;
    });
}

module.exports = ['MessagesService', 'ProductsService', 'OrdersTransformer', OrdersTransformerOrder];
