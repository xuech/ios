'use strict';

function CountrySelectorDirective(SessionService) {

  return {
    restrict: 'A',
    controller: 'CountrySelectorController',
    link(scope, element, attrs) {
      element.on( 'click', () => {
        if ( !SessionService.isLoggedIn ) {
          scope.handleOpenSelector();
        }
      });
    }
  };

}


module.exports = ['SessionService', CountrySelectorDirective];
