'use strict';

function CompaniesResources($resource, apiUrl, CompaniesTransformer) {

  return $resource('', {}, {

    names: {
      method: 'GET',
      url: `${apiUrl}/resources/supplier/localNames`,
      isArray: false,
      interceptor: CompaniesTransformer.names
    },

    addresses: {
      method: 'GET',
      url: `${apiUrl}/resources/users/current/company/address`,
      isArray: false,
      interceptor: CompaniesTransformer.addresses
    }

  });

}

module.exports = ['$resource', 'apiUrl', 'CompaniesTransformer', CompaniesResources];
