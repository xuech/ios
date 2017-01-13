'use strict';

import _ from 'lodash';
import PackageModelMixin from '../../../common/mixins/model.package';

class PackageModel extends PackageModelMixin {

  constructor(data) {
    super();
    _.extend( this, data, { quantity: 0, price: '', originalUnitPrice: '' } );
    this.updatePricingAndInventory();
  }

}


export default function() {

  var productsService;
  this.instance = PackageModel;

  this.$get = ['$log', '$q', 'PricingService', 'ProductsService', 'PackagesTransformerPricing', 'PackagesTransformerProducts', ($log, $q, PricingService, ProductsService, PackagesTransformerPricing, PackagesTransformerProducts) => {
    productsService = productsService || new ProductsService();

    this.instance.prototype._$q = $q;
    this.instance.prototype._$log = $log;
    this.instance.prototype._pricingService  = PricingService;
    this.instance.prototype._productsService = productsService;

    return this.instance;
  }];

}
