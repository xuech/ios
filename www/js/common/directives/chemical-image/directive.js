'use strict';

function ChemicalImageDirective($log, ProductsService) {

  const service = new ProductsService();

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'common/directives/chemical-image/template.html',
    scope: {
      chemical:   '=',
      chemicalId: '=id'
    },

    link(scope, element, attrs) {
      scope.$watch('chemicalId', function(chemicalId) {
        service.loadImageUrl( chemicalId, scope.chemical );
      });
    }
  }

}

module.exports = ['$log', 'ProductsService', ChemicalImageDirective];
