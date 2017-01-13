'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'orders/directives/order-costs/template.html',
    scope: {
      title:        '@',
      items:        '=',
      shipping:     '=',
      taxes:        '=',
      country:      '=',
      currencyCode: '='
    },

    link(scope, element, attrs) {
      scope.isTaxIncluded = false;

      function handleIsTaxIncluded(country) {
        scope.isTaxIncluded = country === 'CN'; // this feels dirty ಠ_ಠ
      }

      function handleAddTotalCost() {
        let items    = parseFloat( scope.items )    || 0;
        let taxes    = parseFloat( scope.taxes )    || 0;
        let shipping = parseFloat( scope.shipping ) || 0;

        scope.totalCost = items + taxes + shipping;
      }

      scope.$watch( 'country', handleIsTaxIncluded );
      scope.$watch( '[total, taxes, shipping]' , handleAddTotalCost, true );
    }
  }

}
