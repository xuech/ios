'use strict';

import _ from 'lodash';

let tomorrowDate = new Date();
tomorrowDate.setDate( tomorrowDate.getDate() + 1 );
const TOMORROW = tomorrowDate;


class CheckoutAddressModel {

  constructor() {
    this.expectedDeliveryDate = TOMORROW;
    this.selectedBillAddr = 117155;
    this.selectedShipAddr = null;
    this.addresses = {
      billing:  [],
      shipping: []
    };
  }

  getAddressesByType(type) {
    switch(type) {
      case 'billing':           return this.addresses.billing;
      case 'shipping': default: return this.addresses.shipping;
    }
  }

  getSelectedAddressByType(type) {
    switch(type) {
      case 'billing':           return this.selectedBillAddr;
      case 'shipping': default: return this.selectedShipAddr;
    }
  }

  setExpectedDeliveryDate(date) {
    if ( date.getTime() >= TOMORROW.getTime() ) {
      this.expectedDeliveryDate = date;
    }
  }

  loadAddresses() {
    let deferred = this._$q.defer();
    let billingAddress  = this.addresses.billing;
    let shippingAddress = this.addresses.shipping;
    let hasAddressData  = billingAddress.length && shippingAddress.length;

    if ( hasAddressData ) {
      deferred.resolve();
    }
    else {
      this._fetchAddresses().then( () => deferred.resolve() );
    }

    return deferred.promise;
  }

  _fetchAddresses() {
    return this._companiesService.findAddresses().then(addressJSON => {
      this.addresses = addressJSON;
    });
  }

}


export default function() {

  this.instance = CheckoutAddressModel;

  this.$get = ['$log', '$q', 'CompaniesService', 'CheckoutAddressesTransformerCompanies', ($log, $q, CompaniesService) => {
    this.instance.prototype._$log = $log;
    this.instance.prototype._$q   = $q;
    this.instance.prototype._companiesService = new CompaniesService();

    return this.instance;
  }];

}
