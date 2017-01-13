'use strict';

import PubSub from './PubSub';


function TabSlideBoxController($scope, $timeout) {
  $scope.events = new PubSub();
  
  $scope.slideHasChanged = function(index){
    $scope.events.trigger( 'slideChange', { index: index } );

    $timeout(function() {
      if ( $scope.onSlideMove ) {
        let data = { index: eval( index ) };
        $scope.onSlideMove( data );
      }
    }, 100);
  };
  
  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    let data = { event: ngRepeatFinishedEvent };
    $scope.events.trigger( 'ngRepeatFinished', data );
  });
}


module.exports = ['$scope', '$timeout', TabSlideBoxController];