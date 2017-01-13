'use strict';

import _ from 'lodash';
import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log'],

  defineScope($scope) {
    $scope.model = {};
  },

  defineListeners($scope) {
    $scope.$watch( 'items', this.updateModelPackagePricing, true );
  },

  updateModelPackagePricing(items=[]) {
    let states    = _.pluck( items, 'isLoading' );
    let isLoading = _.every( states ); // a resolved isLoading is false

    this.$scope.model.isLoading = items.length ? isLoading : false;
    this.updateOrderCountry( items );
    this.updatePackagesTotal( items );
  },

  updateOrderCountry(items=[]) {
    let currencyCodes = _.pluck( items, 'currencyCode' );
    this.$scope.model.currencyCode = currencyCodes[0];
  },

  updatePackagesTotal(items=[]) {
    items = _.filter( items, (item) => !item.isPriceUponRequest );
    let total = _.reduce( items, ((memo, item) => memo + item.getPrice()), 0 );
    this.$scope.model.total = total;
  }

});
