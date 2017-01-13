'use strict';

export default function() {

  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    template: '<ion-toggle ng-model="item.isSelected" toggle-class="toggle-calm" class="item-text-label">{{ item.name }}</ion-toggle>',

    link(scope, element, attrs) {
      element.on('click', evt => {
        let $target = angular.element( evt.target );
        if ( $target.is('selection-toggle') ) {
          let isSelected = scope.item.isSelected;
          scope.$apply( () => scope.item.isSelected = !isSelected );
        }
      });
    }
  };

};
