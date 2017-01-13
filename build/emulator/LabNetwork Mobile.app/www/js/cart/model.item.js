'use strict';

import _ from 'lodash';
import PackageModelMixin from '../common/mixins/model.package';

class CartItemModel extends PackageModelMixin {

  constructor(data) {
    super();
    _.extend( this, data );
    this.updatePricing();
  }

  quantityIncrement() {
    super.quantityIncrement();
    this.updateItem();
  }

  quantityDecrement() {
    super.quantityDecrement();
    this.updateItem();
  }

  updateItem() {
    let item = [ this ];
    this.isLoading = true;

    return this._cartService.updateItems( item ).then((response) => {
      this.updatePricing().then((response) => {
        this.isLoading = false;
        this._$log.debug( 'CartItemModel#updateItem', item[0] );
      });
    })
  }

}


export default function() {

  this.instance = CartItemModel;

  this.$get = ['$log', '$q', 'PricingService', 'CartService', 'CartItemTransformerPricing', ($log, $q, PricingService, CartService, CartItemTransformerPricing) => {
    this.instance.prototype._$log    = $log;
    this.instance.prototype._$q      = $q;
    this.instance.prototype._pricingService = PricingService;
    this.instance.prototype._cartService    = CartService;

    return this.instance;
  }];

}
