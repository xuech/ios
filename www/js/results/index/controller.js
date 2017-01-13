'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$state', '$timeout', 'CriteriaService', 'ResultsModel'],

  initialize($scope, $log, $state, $timeout, CriteriaService, ResultsModel) {
    let criteria = CriteriaService.get();
    this.resultsModel = ResultsModel.resetProducts();
  },

  defineScope($scope) {
    $scope.criteria = this.CriteriaService;
    $scope.model    = this.resultsModel;
  },

  performSearch(criteria) {
    this.resultsModel.performSearch( criteria )
      .finally(() => {
        this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
      })
      .catch(() => {
        this.$log.error( 'There was an error retreiving products.' );
      });
  },

  handlePerformSearch() {
    let criteria = this.CriteriaService.get();
    this.$log.debug( 'handlePerformSearch', criteria );
    this.performSearch( criteria );
  },

  handleDisplayFilters() {
    return this.$state.go( 'app.results.filters' );
  },

  handleDisplayFiltersWithEditor() {
    this.handleDisplayFilters().then(() => {
      // lame... why won't the promise resolve AFTER "$ionicView.enter" event?
      this.$timeout( () => this.$scope.$root.$broadcast('handleOpenEditor') );
    });
  }

});
