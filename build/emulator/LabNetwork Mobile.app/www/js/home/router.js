'use strict';

function HomeRouter($stateProvider) {

  $stateProvider
    .state('app.home', {
      url: '/home',
      views: {
        content: {
          templateUrl: 'home/template.html',
          controller : 'HomeController'
        }
      }
    });

};

module.exports = ['$stateProvider', HomeRouter];
