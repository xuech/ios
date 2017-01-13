'use strict';

import _ from 'lodash';

class CartModel {

  constructor(type) {
    this.itemType = type;
    this.isLoading = true;
    this.items = this._service.createItems( type );
  }

  resetItems(items) {
    this.items[ this.itemType ] = [];

    if ( items && items.length ) {
      items.forEach( (data) => {
        let model = new this._ItemModel( data );
        this.items[ this.itemType ].push( model );
      });
    }
  }

  ensureItemsCollection(items) {
    if ( angular.isArray( items ) && items.length < 1 ) {
      return false;
    }
    return angular.isArray( items ) ? items : [ items ];
  }

  isEmpty() {
    let items = this.items[ this.itemType ];
    return items.length < 1;
  }

  loadItems() {
    this.isLoading = true;

    return this._service.findAll().then((items=[]) => {
      if ( items ) {
        this.resetItems( items );
      }
      this.isLoading = false;
      this._$log.debug( 'CartModel#loadItems', items );
    });
  }

  loadSavedItems() {
    this.isLoading = true;

    return this._service.findAllSaved().then((items=[]) => {
      if ( items ) {
        this.resetItems( items );
      }
      this.isLoading = false;
      this._$log.debug( 'CartModel#loadSavedItems', items );
    });
  }

  addItemsToCart(items=[]) {
    items = this.ensureItemsCollection( items );

    this.isLoading = true;

    return this._service.addItems( items ).then(() => {
      this._$log.debug( 'CartModel#addItemsToCart', items );
      this.removeSavedItems( items );
    });
  }

  saveForLaterItems(items=[]) {
    items = this.ensureItemsCollection( items );

    if ( !items ) {
      const MSG = "Saved for later items was an empty array.";
      return this._$q.reject( MSG );
    }

    this.isLoading = true;

    return this._service.saveForLaterItems( items ).then(() => {
      this._$log.debug( 'CartModel#saveForLaterItems', items );
      this.loadItems();
    });
  }

  removeItems(items=[]) {
    items = this.ensureItemsCollection( items );

    if ( !items ) {
      const MSG = "Remove items was an empty array.";
      return this._$q.reject( MSG );
    }

    // to remove items, the service api requires quantity to be set to 0
    items.forEach( (item) => item.quantity = 0 );

    this.isLoading = true;

    return this._service.removeItems( items ).then(() => {
      this._$log.debug( 'CartModel#removeItems', items );
      this.loadItems();
    });
  }

  removeSavedItems(items=[]) {
    items = this.ensureItemsCollection( items );

    if ( !items ) {
      const MSG = "Remove saved items was an empty array.";
      return this._$q.reject( MSG );
    }

    // to remove items, the service api requires quantity to be set to 0
    items.forEach( (item) => item.quantity = 0 );

    this.isLoading = true;

    return this._service.removeSavedItems( items ).then(() => {
      this._$log.debug( 'CartModel#removeSavedItems', items );
      this.loadSavedItems();
    });
  }
}


export default function() {

  this.instance = CartModel;

  this.$get = ['$log', '$q', '$rootScope', 'CartItemModel', 'CartService', 'CartItemsTransformerCart', 'CartSavedItemsTransformerCart', ($log, $q, $rootScope, CartItemModel, CartService, CartItemsTransformerCart, CartSavedItemsTransformerCart) => {
    this.instance.prototype._$log       = $log;
    this.instance.prototype._$q         = $q;
    this.instance.prototype._$rootScope = $rootScope;
    this.instance.prototype._ItemModel  = CartItemModel;
    this.instance.prototype._service    = CartService;

    return this.instance;
  }];

}
