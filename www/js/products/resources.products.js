'use strict';

function ProductsResources($resource, apiUrl, ProductsTransformer) {

  return $resource('', {}, {

    products: {
      method: 'POST',
      url: `${apiUrl}/resources/search/products`,
      isArray: false,
      interceptor: ProductsTransformer.products
    },

    productsFromMolfile: {
      method: 'POST',
      url: `${apiUrl}/resources/search/products`,
      isArray: false,
      interceptor: ProductsTransformer.products
    },

    product: {
      method: 'GET',
      url: `${apiUrl}/resources/search/products/:productId/:countryId`,
      isArray: false,
      interceptor: ProductsTransformer.product

    },

    chemicalImages: {
      method: 'GET',
      url: `${apiUrl}/resources/files/chemicalimage/:chemId`,
      isArray: false,
      interceptor: ProductsTransformer.chemicalImages
    },

    productInventory: {
      method: 'GET',
      url: `${apiUrl}/resources/search/productInventoryByProductId`,
      isArray: false,
      interceptor: ProductsTransformer.productInventory
    },

    packageInventory: {
      method: 'GET',
      url: `${apiUrl}/resources/search/packageInventory/:productId/:packageId`,
      isArray: false,
      interceptor: ProductsTransformer.packageInventory
    }

  });

}

module.exports = ['$resource', 'apiUrl', 'ProductsTransformer', ProductsResources];
