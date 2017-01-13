'use strict';

import _ from 'lodash';
import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$state', '$ionicHistory', '$ionicModal', 'StructureModel'],

  initialize($scope) {
    this.structureModel = new this.StructureModel();
  },

  defineScope($scope) {
    $scope.model = this.structureModel;
  },

  initializeModal() {
    return this.$ionicModal.fromTemplateUrl('search/editor/template.html', {
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
    this.modal.hide();
  },

  handleSubmitQuery() {
    this.$ionicHistory.clearHistory(); // because ionic is stupid

    // force ionic to not cache the results query we're sending along
    // this.$ionicHistory.clearCache().then(() => {
    let timestamp = ( new Date() ).getTime();
    let query = _.extend( this.$scope.model.prepareQuery(), { timestamp } );

    this.$state.go( 'app.results.index', query );
  }

});
