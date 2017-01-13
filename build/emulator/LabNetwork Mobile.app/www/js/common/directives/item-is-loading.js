'use strict';

function ItemIsLoading($compile) {

  return {
    restrict: 'A',

    link(scope, element, attrs) {
      const tmpl = '<ion-spinner icon="dots" ng-if="isLoading"></ion-spinner>';

      // append spinner
      $compile(tmpl)(scope, (cloned, scope) => {
        element.find( 'a.item-content' ).append( cloned );
      });

      // if loading, do not allow click
      element.on('click', (evt) => {
        if ( scope.isLoading ) {
          evt.preventDefault();
        }
      });

      // evaluate isLoading expression
      scope.$watch(attrs.itemIsLoading, (isLoading) => {
        element.toggleClass( 'is-loading', isLoading );
        scope.isLoading = isLoading;
      });
    }
  };

}

module.exports = ['$compile', ItemIsLoading];