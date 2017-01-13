'use strict';

export default function() {

  return {
    restrict: 'E',
    controller: 'ProductPackagesController',
    templateUrl: 'results/directives/product-packages/template.html',
    scope: {
      product: '='
    }
  };

}