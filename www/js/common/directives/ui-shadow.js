'use strict';

export default function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var $template  = angular.element( '<div class="component-ui-shadow"></div>' );
      element.prepend( $template );
    }
  };

};
