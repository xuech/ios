'use strict';

module.exports = angular.module('login', [])
  .controller( 'LoginController', require('./controller') )

  .directive( 'loginButton', require('./directives/login-button/directive') )
  .directive( 'loginCard',   require('./directives/login-card/directive') );
