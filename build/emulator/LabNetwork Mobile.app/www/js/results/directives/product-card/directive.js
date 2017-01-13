'use strict';

export default function() {

  return {
    restrict: 'E',
    replace : true,
    templateUrl: 'results/directives/product-card/template.html',
    controller: require('./controller'),

    scope: {
      product: '='
    }
  };

}