'use strict';

export default function() {

  return {
    restrict: 'A',
    require: ['ngModel'],
    compile: function($element, $attr) {
      return function linkDateTimeSelect(scope, element, attrs, controllers) {
        let ngModelController = controllers[0];

        scope.$watch($attr.ngMax, function watchNgMax(value) {
          element.attr( 'max', value );
          ngModelController.$render();
        });
      }
    }
  }

}