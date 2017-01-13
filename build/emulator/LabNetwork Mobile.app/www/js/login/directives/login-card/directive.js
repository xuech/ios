'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    controller : 'LoginController',
    templateUrl: 'login/directives/login-card/template.html'
  };

};