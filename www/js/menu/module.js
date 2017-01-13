'use strict';

module.exports = angular.module('menu', [])
  .controller('MenuController', require('./controller'))
  .directive('menuItem',        require('./directives/menu-item/directive'));
