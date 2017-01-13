'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        templateUrl: 'menu/template.html',
        controller : 'MenuController',
        resolve: {
          country: ['CountryService', CountryService => {
            // initially we need to fetch the country by ip before the app starts
            //通过ip获取当前国家信息,并初始化
            CountryService.initialize();
          }]
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise( 'home' );
  }
];
