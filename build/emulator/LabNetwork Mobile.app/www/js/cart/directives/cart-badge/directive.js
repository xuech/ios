'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    controller: 'CartBadgeController',
    templateUrl: 'cart/directives/cart-badge/template.html'
  };

};
