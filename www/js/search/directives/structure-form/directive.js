'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'search/directives/structure-form/template.html',
    scope: {
      query: '='
    }
  };

};
