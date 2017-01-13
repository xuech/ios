'use strict';

function CartItemTransformerPricing(PricingTransformer) {

  return PricingTransformer.pricing.transformResponse()
    .then((response) => {
      let data = response.data.prices[0];
      data.isPriceUponRequest = !data.originalPrice;

      return data;
    });

}

module.exports = [
  'PricingTransformer',
  CartItemTransformerPricing
];
