'use strict';

import BaseController from '../../common/controllers/BaseController';
import _ from 'lodash';

export default BaseController.extend({

  inject: ['$log', '$state', '$q', '$ionicModal', 'FiltersModel', 'ResultsModel', 'CriteriaService', 'StructureModel'],

  initialize($scope) {
    this.filtersModel = this.FiltersModel;
    this.resultsModel = this.ResultsModel;

    this.filtersModel.loadData().then(() => {
      this.updateFilterValues();
    });
  },

  defineScope($scope) {
    $scope.model = this.filtersModel;
    $scope.isLoading = false;
  },

  defineListeners($scope) {
    let deferred = this.$q.defer();

    $scope.$on('$ionicView.enter', () => {
      this.onEnterView();
      deferred.resolve();
    });

    $scope.$on('handleOpenEditor', () => {
      deferred.promise.then( () => this.handleOpenEditor() );
    });
  },

  onEnterView() {
    let cache = this.CriteriaService.get();
    this.structureModel = new this.StructureModel( cache );
    this.$scope.cache = cache;
    this.updateFilterFieldValues();
    this.$scope.structureModel = this.structureModel;
  },

  updateFilterValues() {
    let criteriaCache = this.CriteriaService.get();
    this.filtersModel.setFilterValues( criteriaCache );
  },

  updateFilterFieldValues() {
    let criteriaCache = this.CriteriaService.get();
    this.filtersModel.setFilterFieldValues( criteriaCache );
  },

  performSearch(criteria) {
    this.$log.debug( 'FiltersController#performSearch', criteria );
    this.CriteriaService.set( criteria );

    this.$scope.isLoading = true;

    return this.resultsModel.resetProducts().performSearch( criteria )
      .finally(() => {
        this.updateFilterValues();
        this.$scope.isLoading = false;
      })
      .catch(() => {
        this.$scope.isLoading = false;
        this.$log.error( 'There was an error retreiving products.' );
      });
  },

  handlePerformSearch() {
    let cache         = this.$scope.cache;
    let filters       = this.filtersModel.getFilterValues();
    let criteriaCache = this.CriteriaService.get();

    if ( cache ) {
      if ( cache.query ) {
        cache.molfile = null;
        this.filtersModel.isNewCriteria = criteriaCache.query !== cache.query;
      }
      else if ( cache.molfile ) {
        cache.query = null;
        this.filtersModel.isNewCriteria = criteriaCache.molfile !== cache.molfile;
      }
    }

    let criteria = _.extend( {}, cache, filters );
    this.performSearch( criteria ).finally(() => {
      try {
        cordova.plugins.Keyboard.close();
      }
      catch(e) {
        this.$log.debug( 'Caught Exception: cordova.plugins.Keyboard.close in not defined.' );
      }

      this.$state.go( 'app.results.index' );
    });
  },

  initializeModal() {
    return this.$ionicModal.fromTemplateUrl('results/editor/template.html', {
      scope: this.$scope
    })
    .then( (modal) => this.modal = modal );
  },

  handleOpenEditor() {
    this.structureModel.updateCache();

    if ( !this.modal ) {
      this.initializeModal().then(() => {
        this.modal.show();
      });
    }
    else {
      this.modal.show();
    }
  },

  handleCancelEditor() {
    this.modal.hide();
  },

  handleSubmitEditor() {
    this.structureModel.updateQuery();
    _.extend( this.$scope.cache, this.structureModel.prepareQuery() );
    this.modal.hide();
  }

});
