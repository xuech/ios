'use strict';

import _ from 'lodash';

class ProductModel {

  constructor() {
    this.order   = {};
    this.product = {};
  }

  find(productId) {
    return this._service.find( productId ).then((product) => {
      this.product = product;
      this._logger.debug( 'Product loaded', product );
    });
  }

}


export default function() {

  this.instance = ProductModel;

  this.$get = ['$log', 'ProductsService', 'ProductTransformerProducts', ($log, ProductsService, ProductTransformerProducts) => {
    this.instance.prototype._logger  = $log;
    this.instance.prototype._service = new ProductsService();

    return this.instance;
  }];

}