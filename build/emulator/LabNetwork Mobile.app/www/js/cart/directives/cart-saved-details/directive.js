'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'cart/directives/cart-saved-details/template.html',
    scope: {
      items: '='
    }
  };

};
