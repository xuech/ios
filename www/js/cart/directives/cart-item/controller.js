'use strict';

import _ from 'lodash';
import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$ionicPopup', 'CartItemModel'],

  handleQuantityIncrement() {
    let isDisabled = this.$scope.item.isLoading || this.$scope.item.isInactiveProduct;
    if ( isDisabled ) {
      return;
    }

    this.$scope.item.quantityIncrement();
  },

  handleQuantityDecrement() {
    let isDisabled = this.$scope.item.isLoading || this.$scope.item.isInactiveProduct;
    if ( isDisabled ) {
      return;
    }

    if ( this.$scope.item.hasQuantity() ) {
      this.$scope.item.quantityDecrement();
    }
    else {
      this.$scope.removeItemDelegate( this.$scope.item );
    }
  },

  confirmRemoveItem() {
    return this.$ionicPopup.confirm({
     title: 'Remove Item',
     template: 'Are you sure you want to remove this item from your cart?'
    });
  }

});
