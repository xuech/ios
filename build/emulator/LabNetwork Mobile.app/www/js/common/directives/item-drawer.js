'use strict';

function ItemDrawer($rootScope, $compile) {

  return {
    restrict: 'E',
    scope: true,
    replace: true,
    transclude: true,
    template: '<div class="component-item-drawer" ng-click="toggleDrawer()" ng-transclude></div>',

    controller: ['$scope', '$attrs', function($scope, $attrs) {
      let canCollapse = $attrs.canCollapse === 'false' ? false : true;
      let isCollapsed = $attrs.isCollapsed === 'false' ? false : true;
      $scope.isCollapsed = isCollapsed;

      $scope.toggleDrawer = function() {
        if ( canCollapse ) {
          $scope.isCollapsed = !$scope.isCollapsed;
        }
      };
    }],

    compile(element, attrs) {
      const tmpl  = '<a class="item-icon-right"><collapsible-icon is-collapsed="isCollapsed"></collapsible-icon></a>';

      return function(scope, element) {
        let $divider = element.find( '.item-divider' );
        let $items   = element.find( '.item:not(.item-divider)' );

        let hasMargin = !$divider.hasClass( 'no-margin' );
        element.toggleClass( 'has-margin', hasMargin );

        // Add <collapsible-icon> to .item-divider
        $compile(tmpl)(scope, (cloned, scope) => {
          $divider.append( cloned );
        });

        // Add ng-hide="isCollapsed" expression to each .item
        $items.each((n, item) => {
          let $item = angular.element( item );

          function handleToggle(isCollapsed) {
            $item.toggle( !isCollapsed );
            $rootScope.$broadcast( 'request:content:repaint' );
          }

          handleToggle( scope.isCollapsed );
          scope.$watch( 'isCollapsed', handleToggle );
        });
      }
    }
  };

}

module.exports = ['$rootScope', '$compile', ItemDrawer];
