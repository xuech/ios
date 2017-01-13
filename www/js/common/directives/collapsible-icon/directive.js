'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'common/directives/collapsible-icon/template.html',

    scope: {
      isCollapsed: '='
    },

    link(scope, element, attrs) {
      let isDivider = element.is( '.item-divider' );
      let $divider  = isDivider ? element : element.parents( '.item-divider' );
      
      $divider.addClass( 'with-collapsible-icon' );
    }
  };

};