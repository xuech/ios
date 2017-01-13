'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    controller: 'CartItemController',
    templateUrl: 'cart/directives/cart-item/template.html',
    scope: {
      item: '=',
      removeItemDelegate: '=' // pass argument from contoller, otherwise '&'
    },

    link(scope, element, attrs) {
      element.on( 'click', (evt) => evt.preventDefault() );
    }
  };

};
