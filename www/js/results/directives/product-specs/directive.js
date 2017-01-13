'use strict';

export default function() {

  return {
    restrict: 'E',
    templateUrl: 'results/directives/product-specs/template.html',
    scope: {
      product: '='
    }
  };

}