'use strict';

import _ from 'lodash';
import BaseController from '../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['CartModel'],

  initialize() {
    this.cartModel  = new this.CartModel( 'cart' );
    this.savedModel = new this.CartModel( 'saved' );
  },

  defineScope($scope) {
    $scope.cartModel  = this.cartModel;
    $scope.savedModel = this.savedModel;
  },

  defineListeners($scope) {
    $scope.$on( 'cart:items:added', () => this.cartModel.loadItems() );
    $scope.$on( 'cart:items:saved', () => this.savedModel.loadSavedItems() );
  }

});
