'use strict';

function CheckoutAddressesTransformerCompanies($log, CompaniesTransformer) {

  return CompaniesTransformer.addresses.transformResponse()
    .then(response => {
      let data = response.data;
      return {
        billing:  data.listOfBillAddr,
        shipping: data.listOfShipAddr
      };
    });

}

module.exports = ['$log', 'CompaniesTransformer', CheckoutAddressesTransformerCompanies];
