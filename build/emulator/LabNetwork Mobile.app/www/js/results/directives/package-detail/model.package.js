'use strict';

import _ from 'lodash';
import PackageModelMixin from '../../../common/mixins/model.package';

class PackageModel extends PackageModelMixin {

  constructor(data) {
    super();
    _.extend( this, data );
  }

}


export default function() {

  this.instance = PackageModel;

  this.$get = ['$log', '$q', 'PricingService', 'PackagesTransformerPricing', ($log, $q, PricingService, PackagesTransformerPricing) => {
    this.instance.prototype._$q = $q;
    this.instance.prototype._$log = $log;
    this.instance.prototype._pricingService = PricingService;

    return this.instance;
  }];

}
