'use strict';

import _ from 'lodash';

function CartItemsTransformerItems($log, CartTransformer, localStorageService) {

  return CartTransformer.items.transformResponse()
    .then((response) => {
      let data = response.data;

      let cartKey = data.cartReferenceNumber;
      if ( cartKey ) {
        localStorageService.set( 'cartKey', cartKey );
        $log.debug( 'CartItemsTransformerCart set cartKey', cartKey );
      }

      return data.items.item || [];
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

module.exports = ['$log', 'CartTransformer', 'localStorageService', CartItemsTransformerItems];
