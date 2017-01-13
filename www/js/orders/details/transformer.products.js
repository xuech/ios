'use strict';

import _ from 'lodash';

function ProductsTransformerOrder(ProductsTransformer) {

  ProductsTransformer.productInventory.transformResponse()
    .then((response) => {
      let data = response.data;
      if ( data && data.listProductInventory ) {
        return data.listProductInventory;
      }

      return data;
    });

}

module.exports = ['ProductsTransformer', ProductsTransformerOrder];
