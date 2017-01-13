'use strict';

import _ from 'lodash';


function PackagesTransformerProducts(ProductTransformerProducts) {

  return ProductTransformerProducts.then((product) => {
    product.packages = _.each(product.packages, (pkg) => {
      pkg.description = product.description;
      pkg.productId   = product.id;

      pkg.packageId            = pkg.id;
      pkg.unitOfMeasure        = pkg.packagingUnit;
      pkg.unit                 = pkg.packagingUnit;
      pkg.unitSize             = pkg.packagingSize;
      pkg.countryIsoCode2      = pkg.country;
      pkg.itemNumberWithSuffix = pkg.itemNumber;

      if ( product.supplierShortUrl ) {
        pkg.itemNumberWithSuffix += `-${product.supplierShortUrl}`;
      }
    });

    return product;
  });

}

module.exports = [
  'ProductTransformerProducts',
  PackagesTransformerProducts
];
