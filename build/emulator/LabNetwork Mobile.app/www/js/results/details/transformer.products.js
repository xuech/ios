'use strict';

import _ from 'lodash';

function ProductTransformer(ProductsTransformer, SuppliersService) {

  ProductsTransformer.productInventory.transformResponse()
    .then(response => {
      let data = response.data;
      let inventory = data.listProductInventory;
      return inventory ? inventory[0] : data;
    });

  return ProductsTransformer.product.transformResponse()
    .then(response => {
      let product = response.data;

      // supplier logo
      let companyId = product.companyId;
      SuppliersService.logo( companyId ).then(data => {
        product.supplierLogoUrl = `${data.imageServer}${data.imageLocation}`;
      });

      // categories
      let categories = _.compact(_.pluck( product.groups , 'name' )).join( ', ' );
      product.categories = categories;

      return product;
    })
}

module.exports = ['ProductsTransformer', 'SuppliersService', ProductTransformer];
