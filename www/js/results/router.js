'use strict';

module.exports = ['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('app.results', {
      abstract: true,
      url: '/results',
      views: {
        content: {
          templateUrl: 'results/template.html',
          controller : 'ResultsController'
        }
      }
    })

    // Note: each tab has its own nav history stack
    .state('app.results.index', {
      url: '',
      params: {
        type:      null,
        query:     null,
        timestamp: null,
        molfile:                null,
        similarityThreshold:    null,
        structureSearchType:    null,
        structureEditorEnabled: null,
      },
      views: {
        index: {
          templateUrl: 'results/index/template.html',
          controller : 'ResultsIndexController'
        }
      },
      resolve: ['$stateParams', 'CriteriaService', ($stateParams, CriteriaService) => {
        CriteriaService.set( $stateParams );
      }]
    })

    .state('app.results.details', {
      url: '/details/:id',
      views: {
        index: {
          templateUrl: 'results/details/template.html',
          controller : 'ProductController'
        }
      },
      resolve: {
        productId: [ '$stateParams', $stateParams => $stateParams.id ]
      }
    })

    .state('app.results.filters', {
      url: '/filters',
      views: {
        filters: {
          templateUrl: 'results/filters/template.html',
          controller : 'ResultsFiltersController'
        }
      }
    })

    .state('app.results.selections', {
      url: '/filters/selections/:selectionId',
      views: {
        filters: {
          templateUrl: 'results/selections/template.html',
          controller : 'ResultsSelectionsController'
        }
      },
      resolve: {
        selectionId: ['$stateParams', ($stateParams) => {
          return $stateParams.selectionId;
        }]
      }
    })

}];
