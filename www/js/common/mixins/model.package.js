'use strict';

import _ from 'lodash';

export default class PackageModel {

  updatePricingAndInventory() {
    this.isLoading = true;

    let pricing   = this.updatePricing( false ); // allow us to manage state
    let inventory = this.updateInventory( false ); // allow us to manage state

    return this._$q.all([ pricing, inventory ]).then(() => {
      this.isLoading = false;
    });
  }

  updatePricing(manageState=true) {
    let context = this.item || this;
    let pkg = _.pick( context, 'packageId', 'unitOfMeasure', 'quantity' );

    manageState && ( this.isLoading = true );

    return this._pricingService.find([ pkg ]).then(pricing => {
      _.extend( context, pricing );
      manageState && ( this.isLoading = false );
      return pricing;
    });
  }

  updateInventory(manageState=true) {
    let context = this.item || this;

    manageState && ( this.isLoading = true );

    this._productsService.getInventoryByProductIds( context.productId )
      .then(inventory => {
        this.productInventory = inventory;
        manageState && ( this.isLoading = false );
      });
  }

  getPrice() {
    let context = this.item || this;
    return context.originalPrice;
  }

  getQuantity() {
    return this.quantity;
  }

  resetQuantity() {
    this.quantity = 0;
  }

  hasQuantity(n=1) {
    return this.getQuantity() > n;
  }

  quantityIncrement() {
    ++this.quantity;
  }

  quantityDecrement() {
    --this.quantity;
  }

}
