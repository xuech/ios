'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'orders/directives/order-card/template.html',
    scope: {
      'order': '='
    },

    controller: ['$scope', 'SessionService', ($scope, SessionService) => {
      $scope.permissions = SessionService.permissions;
    }]
  }

}
