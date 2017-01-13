'use strict';

function PricingResources($resource, apiUrl, PricingTransformer) {

  return $resource('', {}, {

    pricing: {
      method: 'POST',
      url: `${apiUrl}/resources/pricing/:countryId`,
      isArray: false,
      interceptor: PricingTransformer.pricing
    },

    startingAt: {
      method: 'POST',
      url: `${apiUrl}/resources/pricing/startingAt/:countryId`,
      isArray: false,
      interceptor: PricingTransformer.startingAt
    },

  });

}

module.exports = ['$resource', 'apiUrl', 'PricingTransformer', PricingResources];
