'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'orders/directives/order-products/template.html',
    scope: {
      'order': '='
    },

    controller: ['$scope', 'SessionService', ($scope, SessionService) => {
      $scope.permissions  = SessionService.permissions;
      $scope.hasShipments = !!$scope.order.shipments && $scope.order.shipments.length > 0;
    }]
  }

}
