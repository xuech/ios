'use strict';

import _ from 'lodash';

function SanitizeNumberDirective($timeout) {
  return {
    restrict: 'A',

    link(scope, element, attr) {
      element.on('change', function(evt) {
        this.value = this.value.replace( /[^0-9\.]+/g, '' );
        if ( this.value < 1 ) this.value = 0;
      });

      element.on('keypress', function(evt) {
        console.log('keypress', evt.which);
        return ( ((evt.which > 47) && (evt.which < 58)) || evt.which === 46 || evt.which === 13 );
      });
    }
  }

}


module.exports = ['$timeout', SanitizeNumberDirective];
