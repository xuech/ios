'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'orders/directives/order-addresses/template.html',
    scope: {
      'order': '='
    }
  }

}
