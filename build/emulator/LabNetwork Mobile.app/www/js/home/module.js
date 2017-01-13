'use strict';

module.exports = angular.module('home', [])

  .controller( 'HomeController', require('./controller') )

  .config(require('./router'));
