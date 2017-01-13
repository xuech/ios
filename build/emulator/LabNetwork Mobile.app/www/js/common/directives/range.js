'use strict';

export default function() {

  return {
    restrict: 'C',
    link: function (scope, element, attr) {
      element.bind('touchstart mousedown', function(evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
      });
    }
  };

}