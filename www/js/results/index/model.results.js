'use strict';

import _ from 'lodash';

class ResultsModel {

  constructor() {
    this.isLoading = true;
    this.resetProducts();
  }

  resetProducts() {
    this.products = {
      filterFields  : [],
      groups        : [],
      groupCount    : 0,
      pageSize      : 10,
      startingRecord: 0,
      totalCount    : 0
    };

    this.canLoadMoreResults = true;

    return this;
  }

  getRequestParams() {



    let params  = {
      country    : this._serviceCountry.country,
      pageSize   : this.products.pageSize,
      startRecord: this.products.groups.length
    };

    return params;
  }

  performSearch(criteria) {
    let params = this.getRequestParams();
    angular.extend( criteria, params );

    this.isLoading = true;

    return this._service.findAll( criteria ).then((products) => {
      this._logger.debug( 'Products loaded', products );

      if ( products.data ) {
        this._handleUpdatingProducts( products );
        this.isLoading = false;
      }
      else {
        this.canLoadMoreResults = false;
      }
    });
  }

  _handleUpdatingProducts(products) {
      let groups = _.union( this.products.groups, products.data.groups );
      products.data.groups = groups;

      this.canLoadMoreResults = groups.length < products.data.groupCount;

      return angular.extend( this.products, products.data );
  }
}


export default function() {

  this.instance = new ResultsModel();

  this.$get = ['$log', 'ProductsService', 'CountryService', ($log, ProductsService, CountryService) => {
    this.instance._logger  = $log;
    this.instance._service = new ProductsService();
    this.instance._serviceCountry = CountryService;

    return this.instance;
  }];

}
