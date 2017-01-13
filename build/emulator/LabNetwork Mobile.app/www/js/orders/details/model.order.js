'use strict';

import _ from 'lodash';

class OrderModel {

  constructor() {
    this.order = null;
  }

  find(orderId) {
    this.isLoading = true;
    return this._service.find( orderId ).then(order => {
      this.order = order;
      this.findUnitPrices( orderId );
      this.isLoading = false;
      this._$log.debug( 'Order loaded', order );
    });
  }

  findUnitPrices(orderId) {
    let items = this.order.orderItems;
    return this._service.findUnitPrices( orderId ).then(prices => {
      _.each(items, item => {
        let costItem = _.findWhere( prices, {id: item.packageId} );
        item.unitCost = costItem.cost;
      });
    });
  }
}


export default function() {

  this.instance = OrderModel;

  this.$get = ['$log', 'OrdersService', 'OrdersTransformerOrder', 'ProductsTransformerOrder', ($log, OrdersService, OrdersTransformerOrder) => {
    this.instance.prototype._$log    = $log;
    this.instance.prototype._service = new OrdersService();

    return this.instance;
  }];

}
