'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', 'productId', 'ProductModel'],

  initialize($scope) {
    this.model = new this.ProductModel();
    this.fetchProduct( this.productId );
  },

  defineScope($scope) {
    $scope.model = this.model;
  },

  defineListeners($scope) {
    $scope.$on( '$ionicView.beforeEnter', () => this.toggleTabs(true)  );
    $scope.$on( '$ionicView.beforeLeave', () => this.toggleTabs(false) );
  },

  toggleTabs(isHidden) {
    let tabs = this.$scope.tabs;
    tabs.isHidden = isHidden;
  },

  fetchProduct(productId) {
    this.model.find( productId ).catch(() => {
      this.$log.error( 'There was an error retreiving product data.' );
    });
  }

});
