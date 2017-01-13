'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$timeout', '$ionicListDelegate', '$ionicPopup'],

  initialize($scope) {
    this.savedModel = $scope.savedModel;
  },

  defineScope($scope) {
    $scope.model = $scope.savedModel;
  },

  defineListeners($scope) {
    $scope.$on( '$ionicView.enter', this.onEnterView );
  },

  onEnterView() {
    if ( this.savedModel.isEmpty() ) {
      this.savedModel.loadSavedItems();
    }
  },

  confirmRemoveItem() {
    return this.$ionicPopup.confirm({
     title: 'Remove Item',
     template: 'Are you sure you want to remove this item from your cart?'
    });
  },

  handleAddItem(item) {
    this.savedModel.addItemsToCart( item );
    this.$ionicListDelegate.closeOptionButtons();
  },

  handleRemoveItem(item) {
    let confirm = this.confirmRemoveItem();
    confirm.then((shouldRemove) => {
      if ( shouldRemove ) {
        this.savedModel.removeSavedItems( item );
        this.$ionicListDelegate.closeOptionButtons();
      }
    });
  }

});
