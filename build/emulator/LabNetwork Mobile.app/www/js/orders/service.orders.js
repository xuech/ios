'use strict';

import _ from 'lodash';

class OrdersService {

  findAll(settings={}) {
    const defaults = {
      page:    1,
      sort:    'createdAt',
      sortDir: 'DESC'
    };

    let data = _.extend( {}, defaults, settings );
    return this._resources.orders( data ).$promise;
  }

  find(orderId) {
    let params = {
      orderId: orderId
    };

    return this._resources.order( params ).$promise;
  }

  findUnitPrices(orderId) {
    let permissions = this._session.permissions;

    if ( permissions.isSiteAdmin || permissions.isCSR ) {
      let params = {
        orderId: orderId
      };

      return this._resources.unitCosts( params ).$promise;
    }

    let defer = this._$q.defer();
    defer.reject( 'Unit Prices for orders are only accesible for CSR and SiteAdmin roles.' );
    return defer.promise;
  }

}


export default function() {

  this.instance = OrdersService;

  this.$get = ['$q', 'SessionService', 'OrdersResources', ($q, SessionService, OrdersResources) => {
    this.instance.prototype._$q = $q;
    this.instance.prototype._session   = SessionService;
    this.instance.prototype._resources = OrdersResources;
    return this.instance;
  }];

}
