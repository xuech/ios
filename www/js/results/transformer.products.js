import _ from "lodash";

function ResultsProductsTransformer($log, MessagesService, PricingService, ProductsService, ProductsTransformer) {

  ProductsTransformer.productInventory.transformResponse()
    .then(response => {
      return response.data;
    });

  return ProductsTransformer.products.transformResponse()
    .then(response => {
      let indexTransformer = require( './index/transformer.products' );
      let productsService  = new ProductsService();
      indexTransformer( response, productsService, PricingService );

      let filtersTransformer = require( './filters/transformer.products' );
      filtersTransformer( response, MessagesService );
    });

}

module.exports = [
  '$log',
  'MessagesService',
  'PricingService',
  'ProductsService',
  'ProductsTransformer',
  ResultsProductsTransformer
];
