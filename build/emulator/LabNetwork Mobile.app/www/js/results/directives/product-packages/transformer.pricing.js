'use strict';

function PackagesTransformerPricing(PricingTransformer) {

  return PricingTransformer.pricing.transformResponse()
    .then((response) => {
      let data = response.data.prices[0];
      data.isPriceUponRequest = data.originalPrice == null ;
      data.price = data.tieredPrice ? data.originalPrice : data.originalUnitPrice;

      return data;
    });

}

module.exports = [
  'PricingTransformer',
  PackagesTransformerPricing
];
