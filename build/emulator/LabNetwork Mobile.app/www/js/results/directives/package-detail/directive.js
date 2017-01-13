'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'results/directives/package-detail/template.html',
    controller: 'PackageDetailController',
    scope: {
      package: '=',
      product: '='
    }
  }

}
