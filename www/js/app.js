'use strict';

require('angular');
require('ionic');
require('angular-local-storage');
require('angular-resource');
require('lodash');
require('../lib/ionic-datepicker/dist/ionic-datepicker.bundle.min');
require('./templates/module');
require('./application/module');
require('./common/module');
require('./auth/module');
require('./cart/module');
require('./checkout/module');
require('./companies/module');
require('./countries/module');
require('./home/module');
require('./login/module');
require('./menu/module');
require('./messages/module');
require('./orders/module');
require('./pricing/module');
require('./products/module');
require('./results/module');
require('./search/module');
require('./session/module');
require('./suppliers/module');

module.exports = angular.module('labnetwork', [
  'ionic',
  'LocalStorageModule',
  'ngResource',
  'ionic-datepicker',
  'templates',
  'application',
  'auth',
  'common',
  'cart',
  'checkout',
  'companies',
  'countries',
  'home',
  'login',
  'menu',
  'messages',
  'orders',
  'pricing',
  'products',
  'results',
  'search',
  'session',
  'suppliers'
])

  .config(require('./router'))

  .config(['$ionicConfigProvider', ($ionicConfigProvider) => {
    $ionicConfigProvider.tabs.position( 'bottom' ).style( 'striped' );
  }])

  .config(['localStorageServiceProvider', (localStorageServiceProvider) => {
    localStorageServiceProvider.setPrefix( 'ln' );
  }])

  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://localhost:8100/**',
      'https://labnetwork.com/**',
      'https://demo.labnetwork.com/**',
      'https://labnetwork.s3.amazonaws.com/**',
      'https://demo-labnetwork.s3.amazonaws.com/**'
    ]);
  }])
//app执行的第一个函数
  .run(require('./main'));
