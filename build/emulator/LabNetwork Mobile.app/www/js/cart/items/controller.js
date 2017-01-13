'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$timeout', '$ionicListDelegate', '$ionicPopup'],

  initialize($scope) {
    this.cartModel = $scope.cartModel;
  },

  defineScope($scope) {
    $scope.model = $scope.cartModel;
  },

  defineListeners($scope) {
    $scope.$on( '$ionicView.enter', this.onEnterView );
  },

  onEnterView() {
    if ( this.cartModel.isEmpty() ) {
      this.cartModel.loadItems();
    }
  },

  confirmRemoveItem() {
    return this.$ionicPopup.confirm({
     title: 'Remove Item',
     template: 'Are you sure you want to remove this item from your cart?'
    });
  },

  handleSaveItem(item) {
    this.cartModel.saveForLaterItems( item );
    this.$ionicListDelegate.closeOptionButtons();
  },

  handleRemoveItem(item) {
    let confirm = this.confirmRemoveItem();
    confirm.then((shouldRemove) => {
      if ( shouldRemove ) {
        this.cartModel.removeItems( item );
        this.$ionicListDelegate.closeOptionButtons();
      }
    });
  }

});
