'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', 'orderId', 'OrderModel'],

  initialize($scope) {
    this.model = new this.OrderModel();
    this.fetchOrder();
  },

  defineScope($scope) {
    $scope.model = this.model;
  },

  fetchOrder() {
    let orderId = this.orderId;
    this.model.find( orderId ).catch(() => {
      this.$log.error( 'There was an error retreiving order data.' );
    });
  }

});
