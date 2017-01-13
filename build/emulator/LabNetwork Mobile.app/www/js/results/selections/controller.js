'use strict';

import _ from 'lodash';
import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$state', 'selectionId', 'SelectionModel'],

  initialize() {
    this.model = new this.SelectionModel( this.selectionId );
  },

  defineScope($scope) {
    $scope.model = this.model.selection;
    $scope.hasMultipleItems = this.model.hasMultipleItems();
    $scope.canSelectAll = !this.model.areAllItemsSelected();
  },

  defineListeners($scope) {
    $scope.$on( '$ionicView.beforeEnter', () => this.toggleTabs(true)  );
    $scope.$on( '$ionicView.beforeLeave', () => this.toggleTabs(false) );
  },

  toggleTabs(isHidden) {
    let tabs = this.$scope.tabs;
    tabs.isHidden = isHidden;
  },

  handleToggleSelected() {
    let isSelected = this.$scope.canSelectAll;
    this.model.toggleSelectAll( isSelected );
    this.$scope.canSelectAll = !this.$scope.canSelectAll;
  },

  handleSubmit() {
    this.model.save();
    this.$state.go( 'app.results.filters' );
  }

});
