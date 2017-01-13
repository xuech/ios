'use strict';

import _ from 'lodash';

function ProductsTransformerInventory(ProductsTransformer) {

  return ProductsTransformer.packageInventory.transformResponse()
    .then( response => response.data );

}

module.exports = ['ProductsTransformer', ProductsTransformerInventory];
