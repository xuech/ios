'use strict';

import _ from 'lodash';

class CartService {

  constructor() {
    this.items = {};
  }

  createItems(type) {
    this.items[ type ] = [];
    this._$log.debug( 'CartService#createItems', type );
    return this.items;
  }

  resetItems() {
    _.each( this.items, (value, key) => this.items[key] = [] );
  }

  getCartKey() {
    return this._store.get( 'cartKey' );
  }

  findAll() {
    let params  = { cartKey: this.getCartKey() };
    return this._resources.items( params ).$promise;
  }

  findAllSaved() {
    return this._resources.savedItems().$promise;
  }

  addItems(items=[]) {
    this._$log.debug( 'CartService#addItems', items );

    let params  = { cartKey: this.getCartKey() };
    let data    = { item: items };
    return this._resources.addItems( params, data ).$promise
      .then(() => {
        this._$rootScope.$broadcast( 'cart:items:added', angular.copy(data) )
      });
  }

  updateItems(items=[]) {
    this._$log.debug( 'CartService#updateItems', items );

    let params  = { cartKey: this.getCartKey() };
    let data    = { item: items };
    return this._resources.updateItems( params, data ).$promise
      .then(() => {
        this._$rootScope.$broadcast( 'cart:items:updated' )
      });
  }

  saveForLaterItems(items=[]) {
    this._$log.debug( 'CartService#saveForLaterItems', items );

    return this._resources.saveForLaterItems( items ).$promise
      .then(() => {
        this._$rootScope.$broadcast( 'cart:items:saved' )
      });
  }

  removeItems(items=[]) {
    this._$log.debug( 'CartService#removeItems', items );

    let params  = { cartKey: this.getCartKey() };
    let data    = { item: items };
    return this._resources.removeItems( params, data ).$promise
      .then(() => {
        this._$rootScope.$broadcast( 'cart:items:removed' )
      });
  }

  removeSavedItems(items=[]) {
    this._$log.debug( 'CartService#removeSavedItems', items );

    return this._resources.removeSavedItems( items ).$promise
      .then(() => {
        this._$rootScope.$broadcast( 'cart:items:removedSaved' )
      });
  }

}


export default function() {

  this.instance = new CartService();

  this.$get = ['$log', '$rootScope', 'localStorageService', 'CartResources', ($log, $rootScope, localStorageService, CartResources) => {
    this.instance._$log       = $log;
    this.instance._$rootScope = $rootScope;
    this.instance._store      = localStorageService;
    this.instance._resources  = CartResources;
    return this.instance;
  }];

}
