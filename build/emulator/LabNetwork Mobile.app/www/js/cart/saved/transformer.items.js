'use strict';

import _ from 'lodash';

function CartItemsTransformerItems($log, CartTransformer) {

  return CartTransformer.savedItems.transformResponse()
    .then(response => {
      return response.data || [];
    })

    .then(items => {
      return _.map(items, item => {
        return _.extend(item, {
          unitOfMeasure:     item.unit,
          isInactiveProduct: item.inactiveProduct
        });
      });
    });

}

module.exports = ['$log', 'CartTransformer', CartItemsTransformerItems];
