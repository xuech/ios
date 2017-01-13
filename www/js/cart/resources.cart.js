'use strict';

function CartResources($resource, apiUrl, CartTransformer) {

  return $resource('', {}, {

    items: {
      method: 'GET',
      url: `${apiUrl}/resources/cart/:cartKey`,
      isArray: false,
      interceptor: CartTransformer.items
    },

    savedItems: {
      method: 'GET',
      url: `${apiUrl}/resources/cart/saveForLater`,
      isArray: true,
      interceptor: CartTransformer.savedItems
    },

    addItems: {
      method: 'PUT',
      url: `${apiUrl}/resources/cart/:cartKey`,
      isArray: false,
      interceptor: CartTransformer.addItems
    },

    updateItems: {
      method: 'POST',
      url: `${apiUrl}/resources/cart/:cartKey`,
      isArray: false,
      interceptor: CartTransformer.updateItems
    },

    updateSavedItems: {
      method: 'POST',
      url: `${apiUrl}/resources/cart/:cartKey`,
      isArray: true,
      interceptor: CartTransformer.updateSavedItems
    },

    saveForLaterItems: {
      method: 'PUT',
      url: `${apiUrl}/resources/cart/moveToSaveItems`,
      isArray: true,
      interceptor: CartTransformer.saveForLaterItems
    },

    removeItems: {
      method: 'POST',
      url: `${apiUrl}/resources/cart/:cartKey`,
      isArray: false
    },

    removeSavedItems: {
      method: 'POST',
      url: `${apiUrl}/resources/cart/updateSaveItems`,
      isArray: true
    },

  });

}

module.exports = ['$resource', 'apiUrl', 'CartTransformer', CartResources];
