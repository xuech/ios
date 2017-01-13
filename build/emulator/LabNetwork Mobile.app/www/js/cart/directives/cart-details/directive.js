'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    controller: 'CartDetailsController',
    templateUrl: 'cart/directives/cart-details/template.html',
    scope: {
      items: '='
    }
  };

};
