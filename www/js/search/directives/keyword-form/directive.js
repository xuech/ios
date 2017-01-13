'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'search/directives/keyword-form/template.html',
    scope: {
      query: '='
    }
  };

};
