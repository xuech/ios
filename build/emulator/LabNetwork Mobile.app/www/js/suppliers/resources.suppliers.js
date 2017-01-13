'use strict';

function PricingResources($resource, apiUrl, SuppliersTransformer) {

  return $resource('', {}, {

    logo: {
      method: 'GET',
      url: `${apiUrl}/resources/supplier/supplierLogo/:supplierId`,
      isArray: false,
      interceptor: SuppliersTransformer.pricing
    },

  });

}

module.exports = ['$resource', 'apiUrl', 'SuppliersTransformer', PricingResources];
