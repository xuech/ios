'use strict';

import _ from 'lodash';
import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$rootScope', 'CartModel'],

  initialize() {
    this.itemsModel = new this.CartModel( 'cart' );

    if ( this.itemsModel.isEmpty() ) {
      this.itemsModel.loadItems();
    }
  },

  defineScope($scope) {
    $scope.model = this.itemsModel;
  },

  defineListeners($scope) {
    this.$rootScope.$on( 'cart:items:added', () => this.itemsModel.loadItems() );
    this.$rootScope.$on( 'auth:login',  () => this.itemsModel.loadItems() );
    this.$rootScope.$on( 'auth:logout', () => this.itemsModel.resetItems() );
  }

});
