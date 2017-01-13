'use strict';

export default function() {

  return {
    restrict: 'C',

    controller: ['$scope', '$attrs', '$q', function($scope, $attrs, $q) {
      $scope.renderDeferred = $q.defer();
      $scope.renderPromise  = $scope.renderDeferred.promise;

      // override to resolve when ready
      this.elementHasRendered = function() {
        $scope.renderDeferred.resolve();
      };

      // initilly call render method if not deferred
      if ( $attrs.deferRender !== 'true' ) {
        this.elementHasRendered();
      }
    }],

    link(scope, element, attrs) {
      if ( element.is(':not(ion-header-bar)') ) return;
      
      // stack subheaders
      let $prev = element.prev( '.bar-subheader' );

      if ( $prev.length ) {
        element.css({
          top: $prev.offset().top + $prev.outerHeight()
        });
      }
    }
  };

};