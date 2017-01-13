'use strict';

import _ from 'lodash';

function OrdersTransformerOrders(MessagesService, OrdersTransformer) {

  return OrdersTransformer.orders.transformResponse()
    .then((response) => {
      let data = response.data;
      const STATUSES = MessagesService.orders.fulfillmentStatus;

      // replace status code with proper status
      _.each( data.orderEntryInfo, order => {
        let statusCode = order.fulfillmentStatus;
        order.fulfillmentStatus = STATUSES[ statusCode ];
      });

      return {
        total: data.total,
        list : data.orderEntryInfo
      };
    });
}

module.exports = ['MessagesService', 'OrdersTransformer', OrdersTransformerOrders];
