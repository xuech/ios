'use strict';

export default function($rootScope) {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $rootScope.$on( '$stateChangeSuccess', handleRouteChangeSuccess );

      function handleRouteChangeSuccess(evt, toState, toParams, fromState, fromParams) {
        $rootScope.$broadcast( 'ui-state-change:begin' );

        let fromStateName = fromState.name.replace(/\./g, '-');
        let toStateName   = toState.name.replace(/\./g, '-');
        element.removeClass( `ui-${fromStateName}` ).addClass( `ui-${toStateName}` );

        $rootScope.$broadcast( 'ui-state-change:complete' );
      }
    }
  }

};
