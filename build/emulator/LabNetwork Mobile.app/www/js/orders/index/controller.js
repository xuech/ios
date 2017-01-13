'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', 'OrdersModel'],

  initialize($scope, $log, OrdersModel) {
    this.ordersModel = OrdersModel.resetOrders();
  },

  defineScope($scope) {
    $scope.model = this.ordersModel;
  },

  handleLoadOrders() {
    this.ordersModel.loadOrders()
      .finally(() => {
        this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
      })
      .catch(() => {
        this.$log.error( 'There was an error retreiving orders.' );
      });
  }

});
