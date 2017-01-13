'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    controller : 'LoginController',
    templateUrl: 'login/directives/login-button/template.html'
  };

};