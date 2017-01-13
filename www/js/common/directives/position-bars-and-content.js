'use strict';

function PositionBarsAndContent($rootScope, $q, $ionicScrollDelegate) {

  return {
    restrict: 'AC',

    link: function(scope, element, attrs) {
      // initially handle layout
      handleLayout();

      // handle layout on content repaint request
      $rootScope.$on('request:content:repaint', () => {
        $ionicScrollDelegate.resize();
      });

      function handleLayout() {
        // Get all the headers in the parent of ion-content
        var $parent  = element.parents( 'ion-view:first' ),
            $headers = $parent.find( '.bar-subheader:not(.bar-footer)' ),
            promises = [];

        // defer rendering to ensure all child directives are ready to render
        // so this content properly knows where to be positioned
        $headers.each(function(i, header) {
          let $header = angular.element( header );
          let promise = $header.scope().renderPromise;
          promises.push( promise );
        });

        // once all promises have resolved, position the content
        $q.all( promises ).then( positionContent );

        function positionContent() {
          let $header   = $headers.last();
          let offsetTop = $header.offset().top + $header.outerHeight();

          // Position the ion-content element directly below all the headers
          let animationDuration = parseInt( attrs.animation );
          if ( !!animationDuration ) {
            element.css({ top: element.outerHeight() });
            element.animate({ top: offsetTop }, animationDuration, 'swing');
          }
          else {
            element.css({ top: offsetTop });
          }

          // $header may not hasLayout as view isn't quite rendered
          // listen for view to render, and reposition content
          $header.scope().$on( '$ionicView.enter', positionContent );
        }
      }

    }
  };

};

module.exports = ['$rootScope', '$q', '$ionicScrollDelegate', PositionBarsAndContent];
