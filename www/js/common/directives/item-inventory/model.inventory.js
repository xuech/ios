'use strict';

import _ from 'lodash';


class InventoryModel {

  constructor(attrs) {

    this.attributes   = {};
    this.inStock      = false;
    this.hasInventory = false;

    this.updateAttributes( attrs );
    this.inventory = this._messagesService.inventory.inquire;
  }

  updateAttributes(attrs) {
    _.extend( this.attributes, attrs );
  }

  updateInventory(inventory) {
    this._$log.debug( 'InventoryModel#updateInventory', inventory );

    let hasInventory = !$.isEmptyObject( inventory );
    if ( hasInventory ) {
      this.inventoryDetails = [ inventory ];

      if ( this.attributes.productPackage ) {
        this._getPackageInventory().then(productInventory => {
          if ( productInventory.listProductInventory ) {
            let productId = this._getProductId();
            let packageInventory = _.filter( productInventory.listProductInventory, { productId: productId });
            // Checks to see if we only have product level info available for display. Used during checkout process.
            this.inventoryDetails = packageInventory;
          }
          this._updateInventoryInfo();
        });
      }
      else {
        this._updateInventoryInfo();
      }
    }
  }

  _getProductId() {
    let attrs = this.attributes;

    if ( attrs.productId ) {
      return attrs.productId;
    }
    else if ( attrs.product ) {
      return attrs.product.id;
    }
  };

  _getPackageInventory() {
    let productId = this._getProductId();
    let packageId = this.attributes.productPackage;

    return this._productsService.getPackageInventory( productId, packageId );
  }

  _updateInventoryInfo() {
    let inventoryDetails = this.inventoryDetails;

    if ( inventoryDetails.length > 0 ) {
      this.hasInventory = inventoryDetails !== undefined && inventoryDetails.length > 0;

      // Flag if each location has stock.
      _.each(inventoryDetails, i => {
        i.inStock = i.quantityAvailable > 0 || i.availability;
        this.inStock = !!i.inStock;
      });
    }
    else {
      this.inStock = this.hasInventory = false;
      this.inventoryDetails = undefined;
    }

    if ( this.attributes.shipTime ) {
      this.inventory = this._getShipsWithinMessage();
    }
    else {
      this.inventory = this._getStockMessage();
    }
  }

  _getShipsWithinMessage() {
    const Messages = this._messagesService;

    let inventoryDetails = this.inventoryDetails;
    let msg = Messages.inventory.inquire;

    if ( inventoryDetails ) {
      angular.forEach(inventoryDetails, loc => {
        if ( loc.unitType === 'ea' ) {
          loc.unitType = ` ${Messages.inventory.stock.sku.ea}`;
        }
      });
      if ( !this.inStock ) {
        if ( inventoryDetails[0].backorderLeadTime ) {
          msg = inventoryDetails[0].backorderLeadTime;
        }
        else {
          msg = Messages.inventory.inquire;
        }
      }
      else {
        var days, singleDay = false;
        let shipsWithinDaysMin = inventoryDetails[0].usuallyShipsDaysMin;
        let shipsWithinDays    = inventoryDetails[0].usuallyShipsWithinDays;

        if ( shipsWithinDaysMin && shipsWithinDays ) {
          days = `${shipsWithinDaysMin}-${shipsWithinDays}`;
        }
        else if ( shipsWithinDays ) {
          days = shipsWithinDays;

          if ( parseInt(days, 0) === 1 ) {
            singleDay = true;
          }
        }

        if ( days ) {
          let label = Messages.orderDetail[ singleDay ? 'day' : 'days' ];
          msg = `${days} ${label}`;
        }
        else {
          msg = Messages.inventory.inquire;
        }
      }
    }

    return msg;
	}

  _getStockMessage() {
    const Messages = this._messagesService;

    let inventoryDetails = this.inventoryDetails;
    let msg = Messages.inventory.inquire;

    if ( !this.hasInventory ) {
      msg = Messages.inventory.inquire;

      if ( this.attributes.label ) {
        msg = `${Messages.proddetails.totalstock} ${msg}`;
      }
    }
    else if ( this.inStock ) {
      let totalInv   = 0;
      let unitGroup  = _.groupBy( inventoryDetails, 'unitType' );
      let groupCount = Object.keys( unitGroup ).length;

      angular.forEach(inventoryDetails, loc => {
        if ( loc.unitType === 'ea' ) {
          loc.unitType = ` ${Messages.inventory.stock.sku.ea}`;
        }
      });

    	if ( groupCount === 1 ) {
        let invSum = _.sum( inventoryDetails, 'quantityAvailable' )
        totalInv = Number( invSum.toFixed(2) );

        let unitType = inventoryDetails[0].unitType;
        if ( unitType === 'l' || unitType === 'ml' ) {
          unitType = this._productsService.litersCase( unitType );
        }
        msg = totalInv + unitType;

        if ( this.label ) {
          msg = `${Messages.proddetails.totalstock} ${msg}`;
        }
      }

      if ( groupCount > 1 || totalInv === 0 ) { // can't sum different unit types. Just show in stock.
        msg = Messages.search.inStock;
      }
    }

    else if ( !this.inStock ) {
      let hasAvailability = _.sum( inventoryDetails, 'availability' );
      if ( !hasAvailability ) {
        msg = Messages.inventory.backordered;
      }
      else {
        msg = Messages.search.inStock;
      }
    }

    return msg;
  }

}


export default function() {

  var productsService = null;
  this.instance = InventoryModel;

  this.$get = ['$log','MessagesService', 'ProductsService', 'ProductsTransformerInventory', ($log, MessagesService, ProductsService, ProductsTransformerInventory) => {
    productsService = productsService || new ProductsService();

    this.instance.prototype._$log = $log;
    this.instance.prototype._messagesService = MessagesService;
    this.instance.prototype._productsService = productsService;

    return this.instance;
  }];

}
