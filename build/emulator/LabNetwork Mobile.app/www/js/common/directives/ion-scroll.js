'use strict';

function IonScroll($timeout) {

  return {
    link: function (scope, element, attrs) {
      if ( !element.parent().is( 'ion-slide' ) ) return;

      $timeout(() => {scope.$eval(() => {
        let $scroll = element.find( '.scroll' );
        let offset  = element.parent().offset().top + $scroll.outerHeight();
        
        $scroll.css({ height: offset });
      })}, 0);
    }
  }

}


module.exports = ['$timeout', IonScroll];